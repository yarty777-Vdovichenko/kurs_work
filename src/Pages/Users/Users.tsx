import { IconButton, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { deleteUser, getUsers } from "../../api/users.api.ts";
import { Clear, Delete, Edit, FilterAlt, Refresh } from "@mui/icons-material";
import ModalUser from "../../Components/ModalUser/ModalUser.tsx";
import { type Role, type User } from "../../types/types.ts";
import { useRole } from "../../hooks/useRole.ts";

export default function Users() {
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    const [openFilter, setOpenFilter] = useState(false);
    const [filterRole, setFilterRole] = useState<string>("All");
    const [filterSort, setFilterSort] = useState<string>("None");
    const [search, setSearch] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [currentRole, setCurrentRole] = useState<Role>("");
    const [id, setId] = useState<string>("");

    const [refresh, setRefresh] = useState(0);

    const role = useRole();

    async function loadUser() {
        try {
            const response = await getUsers();
            setUsers(response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadUser();
    }, [refresh]);

    const filteredUsers = useMemo(() => {
        let result = [...users];

        if (filterRole !== "All") {
            result = result.filter(user => user.role === filterRole);
        }

        if (search) {
            result = result.filter(user =>
                user.name.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (filterSort === "Name") {
            result.sort((a, b) => a.name.localeCompare(b.name));
        } else if (filterSort === "Email") {
            result.sort((a, b) => a.email.localeCompare(b.email));
        }

        return result;
    }, [users, filterRole, filterSort, search]);

    function changeSelect(id: string) {
        setSelectedUsers(prev =>
            prev.includes(id)
                ? prev.filter(u => u !== id)
                : [...prev, id]
        );
    }

    async function deleteSelected() {
        const isConfirmed = window.confirm("Ви впевнені?");
        if (!isConfirmed) return;

        try {
            const toDelete = role === "Admin"
                ? selectedUsers.filter(id => {
                    const user = users.find(u => u.id === id);
                    return user?.role === "User";
                })
                : selectedUsers;

            if (toDelete.length === 0) {
                alert("Немає дозволених для видалення користувачів");
                return;
            }

            await Promise.all(toDelete.map(id => deleteUser(id)));

            setSelectedUsers([]);
            setRefresh(prev => prev + 1);

        } catch (error: any) {
            console.log(error);
            alert(error);
        }
    }

    return (
    <div className="tarifs-main">

        <div className="tarifs-search">
            <TextField
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Пошук за ім'ям/ел. поштою..."
                sx={{ backgroundColor: "white", flex: 1, borderRadius: 1 }}
            />

            <IconButton onClick={() => setSearch("")}>
                <Clear sx={{ color: "white" }} />
            </IconButton>

            <IconButton onClick={() => {
                setOpenFilter(prev => !prev);
                setFilterSort("None");
                setFilterRole("All");
            }}>
                <FilterAlt sx={{ fontSize: "28px", color: "white" }} />
            </IconButton>
        </div>

        {openFilter && (
            <div className="tarifs-filter-menu">
                <p>Role</p>
                <div className="tarifs-choose">
                    {["All", "Manager", "Admin", "User"].map(r => (
                        <div
                            key={r}
                            className={`tarifs-variant ${filterRole === r ? "selected" : ""}`}
                            onClick={() => setFilterRole(r)}
                        >
                            {r}
                        </div>
                    ))}
                </div>

                <p>Сортування</p>
                <div className="tarifs-choose">
                    {["None", "Name", "Email"].map(s => (
                        <div
                            key={s}
                            className={`tarifs-variant ${filterSort === s ? "selected" : ""}`}
                            onClick={() => setFilterSort(s)}
                        >
                            {s}
                        </div>
                    ))}
                </div>
            </div>
        )}

        {selectedUsers.length === 0 && (
            <div className="tarifs-simple">
                <p><i>Центр управління користувачами: всі, хто підключений до нашого сервісу, в одному місці</i></p>
            </div>
        )}

        {selectedUsers.length > 0 && (
            <div className="tarifs-menu">
                <p>Вибрано користувачів: {selectedUsers.length}</p>
                <div>
                    <IconButton onClick={deleteSelected}>
                        <Delete sx={{ fontSize: "32px", color: "white" }} />
                    </IconButton>

                    <IconButton onClick={() => setSelectedUsers([])}>
                        <Clear sx={{ fontSize: "32px", color: "white" }} />
                    </IconButton>
                </div>
            </div>
        )}

        <div className="tarifs-cards">
            {filteredUsers.map(user => (
                <div
                    key={user.id}
                    className={`tarifs-card ${selectedUsers.includes(user.id) ? "selected" : ""}`}
                    style={{
                        cursor:
                            role === "Manager" ||
                            (role === "Admin" && user.role === "User")
                                ? "pointer"
                                : "default"
                    }}
                    onClick={() => {
                        if (role === "Manager") changeSelect(user.id);
                        if (role === "Admin" && user.role === "User") changeSelect(user.id);
                    }}
                >
                    <div className="tarifs-data">
                        <span>ID: {user.id}</span>
                        <span>Role: {user.role}</span>
                        <span>Name: {user.name}</span>
                        <span>Email: {user.email}</span>
                    </div>

                    <div className="tarifs-selection">
                        {role === "Manager" && (
                            <IconButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setId(user.id);
                                    setCurrentRole(user.role);
                                    setModalOpen(true);
                                }}
                            >
                                <Edit sx={{ color: "white" }} />
                            </IconButton>
                        )}
                    </div>
                </div>
            ))}
        </div>

        <div className="tarifs-icons">
            <IconButton
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                sx={{ backgroundColor: "#ec813f", color: "white", transition: "0.3s", "&:hover": { backgroundColor: "#26382e" } }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8 6l4-4l4 4m-4-4v20" />
                </svg>
            </IconButton>
            <IconButton
                onClick={() => setRefresh(prev => prev + 1)}
                sx={{
                    backgroundColor: "#ec813f",
                    color: "white",
                    "&:hover": { backgroundColor: "#26382e" }
                }}
            >
                <Refresh />
            </IconButton>
        </div>

        {modalOpen && (
            <ModalUser
                role={currentRole}
                id={id}
                setOpen={setModalOpen}
                onSuccess={() => setRefresh(prev => prev + 1)}
            />
        )}
    </div>
);
}