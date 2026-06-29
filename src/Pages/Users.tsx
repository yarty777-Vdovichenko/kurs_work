<CircularProgress size={20} color="inherit" />
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { deleteUser, getUsers } from "../api/users.api.ts";
import { Clear, Edit, FilterAlt } from "@mui/icons-material";
import ModalUser from "../Components/Modals/ModalUser.tsx";
import { type Role, type User } from "../types/types.ts";
import type { RootState } from "../store/store.ts";
import { useSelector } from "react-redux";
import useRefresh from "../hooks/useRefresh.ts";
import { FloatingActionButtons } from "../Components/FloatingActionButtons/FloatingActionButtons.tsx";
import { SelectionBar } from "../Components/SelectionBar/SelectionBar.tsx";
import { EntityCard } from "../Components/EntityCard/EntityCard.tsx";
import { FilterPanel } from "../Components/Filter/FilterPanel.tsx";
import { FilterOptionGroup } from "../Components/Filter/FilterOptionGroup.tsx";
import useSnackbar from "../hooks/useSnackbar.ts";
import useConfirm from "../hooks/useConfirm.ts";

export default function Users() {
    const [isLoading, setIsLoading] = useState(true);

    const { confirm, openDialog, message, handleConfirm, handleCancel } = useConfirm();

    const { showSnackbar } = useSnackbar();

    const { refresh, triggerRefresh } = useRefresh();

    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    const [openFilter, setOpenFilter] = useState(false);
    const [filterRole, setFilterRole] = useState<string>("All");
    const [filterSort, setFilterSort] = useState<string>("None");
    const [search, setSearch] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [currentRole, setCurrentRole] = useState<Role>("");
    const [id, setId] = useState<string>("");

    const role = useSelector((state: RootState) => state.auth.role);;

   async function loadUser() {
        try {
            setIsLoading(true);
            const response = await getUsers();
            setUsers(response);
        } catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
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
        const isConfirmed = await confirm("Ви впевнені?");
        if (!isConfirmed) return;

        try {
            const toDelete = role === "Admin"
                ? selectedUsers.filter(id => {
                    const user = users.find(u => u.id === id);
                    return user?.role === "User";
                })
                : selectedUsers;

            if (toDelete.length === 0) {
                showSnackbar("Немає дозволених для видалення користувачів","warning");
                return;
            }

            await Promise.all(toDelete.map(id => deleteUser(id)));

            setSelectedUsers([]);
            triggerRefresh();
            showSnackbar("Користувачів видалено", "success");

        } catch (error: any) {
            console.log(error);
            showSnackbar(error,"error");
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
            <FilterPanel>
                <FilterOptionGroup
                    title="Role"
                    options={["All", "Manager", "Admin", "User"].map(r => ({ value: r, label: r }))}
                    selectedValue={filterRole}
                    onSelect={setFilterRole}
                />
                <FilterOptionGroup
                    title="Сортування"
                    options={["None", "Name", "Email"].map(s => ({ value: s, label: s }))}
                    selectedValue={filterSort}
                    onSelect={setFilterSort}
                />
            </FilterPanel>
        )}

        <SelectionBar
            selectedCount={selectedUsers.length}
            placeholder="Центр управління користувачами: всі, хто підключений до нашого сервісу, в одному місці"
            selectedLabel="Вибрано користувачів"
            onDelete={deleteSelected}
            onClear={() => setSelectedUsers([])}
            simpleClassName="tarifs-simple"
            menuClassName="tarifs-menu"
        />
        {isLoading?<div className="allCenter"><CircularProgress size={50} sx={{color:"white"}} /></div>:
        <div className="tarifs-cards">
            {filteredUsers.map(user => (
                <EntityCard
                    key={user.id}
                    selected={selectedUsers.includes(user.id)}
                    cursor={
                        role === "Manager" || (role === "Admin" && user.role === "User")
                            ? "pointer"
                            : "default"
                    }
                    onClick={() => {
                        if (role === "Manager") changeSelect(user.id);
                        if (role === "Admin" && user.role === "User") changeSelect(user.id);
                    }}
                    actions={
                        role === "Manager" && (
                            <IconButton onClick={(e) => {
                                e.stopPropagation();
                                setId(user.id);
                                setCurrentRole(user.role);
                                setModalOpen(true);
                            }}>
                                <Edit sx={{ color: "white" }} />
                            </IconButton>
                        )
                    }
                >
                    <span>ID: {user.id}</span>
                    <span>Role: {user.role}</span>
                    <span>Name: {user.name}</span>
                    <span>Email: {user.email}</span>
                </EntityCard>
            ))}
        </div>
        }

       <FloatingActionButtons
            className="tarifs-icons"
            onRefresh={triggerRefresh}
        />

        {modalOpen && (
            <ModalUser
                role={currentRole}
                id={id}
                setOpen={setModalOpen}
                onSuccess={() => triggerRefresh()}
            />
        )}
        <Dialog open={openDialog} onClose={handleCancel} PaperProps={{
                sx: { backgroundColor: "#196441", color: "white" }
            }}>
            <DialogTitle sx={{fontSize:"22px",fontWeight:"700"}}>Підтвердження</DialogTitle>
            <DialogContent>{message}</DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} sx={{color:"#ec813f",fontWeight:"700"}}>Скасувати</Button>
                <Button onClick={handleConfirm} color="error" sx={{color:"#6beeb1",fontWeight:"700"}}>ОК</Button>
            </DialogActions>
        </Dialog>
    </div>
);
}