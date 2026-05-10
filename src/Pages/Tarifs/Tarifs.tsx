import { IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import TarifDrawer from "../../Components/TarifDrawer/TarifDrawer.tsx";
import styles from "./Tarifs.module.css";
import { Clear, Delete, Edit, FilterAlt, Refresh } from "@mui/icons-material";
import { type Tarif } from "../../types/types.ts";
import { getTarifs } from "../../api/tarifs.api";
import ModalTarif from "../../Components/ModalTarif/ModalTarif.tsx";
import ModalDeleteTarif from "../../Components/ModalDeleteTarif/ModalDeleteTarif.tsx";
import { useRole } from "../../hooks/useRole.ts";

const selected = { backgroundColor: "#52b57d" };

export default function Tarifs() {
    const [open, setOpen] = useState(false);

    const [selectedTarifs, setSelectedTarifs] = useState<string[]>([]);

    const [tarifs, setTarifs] = useState<Tarif[]>([]);
    const [displayedTarifs, setDisplayedTarifs] = useState<Tarif[]>([]);

    const [openFilter, setOpenFilter] = useState(false);

    const [filterSort, setFilterSort] = useState<string>("None");

    const [search, setSearch] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [editedTarif, setEditedTarif] = useState<Tarif | null>(null);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [tarifToDelete, setTarifToDelete] = useState<string>("");

    const role = useRole();

    useEffect(() => {
        let result = [...tarifs];

        if (search) {
            const searchLower = search.toLowerCase();

            result = result.filter(tarif =>
                (tarif.name ?? "").toLowerCase().includes(searchLower)
            );
        }

        if (filterSort === "Name") {
            result.sort((a, b) => a.name.localeCompare(b.name));
        } 
        else if (filterSort === "Price") {
            result.sort((a, b) => a.price - b.price);
        }

        setDisplayedTarifs(result);

    }, [tarifs, filterSort, search]);

    async function loadTarifs() {
        try {
            const response = await getTarifs();
            setTarifs(response);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadTarifs();
    }, []);

    function changeSelect(id: string) {
        setSelectedTarifs(prev =>
            prev.includes(id)
                ? prev.filter(t => t !== id)
                : [...prev, id]
        );
    }

    function deleteSelected() {

        if (selectedTarifs.length === 0) {
            return;
        }

        if (selectedTarifs.length > 1) {
            alert("Можна видаляти лише один тариф за раз");
            return;
        }

        setTarifToDelete(selectedTarifs[0]);
        setDeleteModalOpen(true);
    }

    return (
        <div className={styles.mainUser}>

            <div className={styles.search}>

                <TextField
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Пошук тарифу..."
                    sx={{
                        backgroundColor: "white",
                        flex: 1,
                        borderRadius: 1
                    }}
                />

                <IconButton onClick={() => setSearch("")}>
                    <Clear sx={{ color: "white" }} />
                </IconButton>

                <IconButton
                    onClick={() => {
                        setOpenFilter(prev => !prev);
                        setFilterSort("None");
                    }}
                >
                    <FilterAlt
                        sx={{
                            fontSize: "28px",
                            color: "white"
                        }}
                    />
                </IconButton>

            </div>

            {openFilter && (
                <div className={styles.filterMenu}>

                    <p>Сортування</p>

                    <div className={styles.choose}>

                        <div
                            className={`${styles.variant} ${filterSort === "None" ? styles.selected : ""}`}
                            onClick={() => setFilterSort("None")}
                        >
                            Без сортування
                        </div>

                        <div
                            className={`${styles.variant} ${filterSort === "Name" ? styles.selected : ""}`}
                            onClick={() => setFilterSort("Name")}
                        >
                            За назвою
                        </div>

                        <div
                            className={`${styles.variant} ${filterSort === "Price" ? styles.selected : ""}`}
                            onClick={() => setFilterSort("Price")}
                        >
                            За ціною
                        </div>

                    </div>

                </div>
            )}

            {selectedTarifs.length === 0 && (
                <div className={styles.simple}>
                    <p>
                        <i>Список доступних тарифів</i>
                    </p>
                </div>
            )}

            {selectedTarifs.length > 0 && (
                <div className={styles.menu}>

                    <p>
                        Вибрано тарифів: {selectedTarifs.length}
                    </p>

                    <div>

                        <IconButton onClick={deleteSelected}>
                            <Delete
                                sx={{
                                    fontSize: "32px",
                                    color: "white"
                                }}
                            />
                        </IconButton>

                        <IconButton onClick={() => setSelectedTarifs([])}>
                            <Clear
                                sx={{
                                    fontSize: "32px",
                                    color: "white"
                                }}
                            />
                        </IconButton>

                    </div>

                </div>
            )}

            <div className={styles.cardsUser}>

                {displayedTarifs.map(tarif => (

                    <div
                        key={tarif.id}
                        className={`${styles.cardUser} ${selectedTarifs.includes(tarif.id) ? styles.selected : ""}`}
                        onClick={() => {
                            if(role!=="User"){
                            changeSelect(tarif.id);
                            setOpen(false);}
                        }}
                    >

                        <div className={styles.dataUser}>

                            <span>ID: {tarif.id}</span>

                            <span>
                                Назва: {tarif.name}
                            </span>

                            <span>
                                Інтернет (ГБ): {tarif.internet_capacity}
                            </span>

                            <span>
                                Хвилини: {tarif.minutes}
                            </span>

                            <span>
                                Додатково: {tarif.additional}
                            </span>

                            <span>
                                Ціна: {tarif.price}
                            </span>

                        </div>

                        <div
                            className={styles.selectionUser}
                            style={selectedTarifs.includes(tarif.id) ? selected : {}}
                        >
                            {role!=="User"&&
                            <IconButton
                                onClick={(e) => {
                                    e.stopPropagation();

                                    setEditedTarif(tarif);

                                    setModalOpen(true);
                                }}
                            >
                                <Edit sx={{ color: "white" }} />
                            </IconButton>}

                        </div>

                    </div>
                ))}

            </div>

            <div className={`${styles.iconsUsers} ${open ? styles.open : ""}`}>

                <IconButton
                    onClick={() =>
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        })
                    }
                    sx={{
                        backgroundColor: "#ec813f",
                        color: "white",
                        transition: "0.3s",

                        "&:hover": {
                            backgroundColor: "#26382e",
                            color: "white"
                        }
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m8 6l4-4l4 4m-4-4v20"
                        />
                    </svg>
                </IconButton>
                {role!=="User"&&
                <IconButton
                    onClick={() => setOpen(true)}
                    sx={{
                        backgroundColor: "#ec813f",
                        color: "white",
                        transition: "0.3s",

                        "&:hover": {
                            backgroundColor: "#26382e",
                            color: "white"
                        }
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2"
                        />
                    </svg>
                </IconButton>
                }

                <IconButton
                    onClick={() => loadTarifs()}
                    sx={{
                        backgroundColor: "#ec813f",
                        color: "white",
                        transition: "0.3s",

                        "&:hover": {
                            backgroundColor: "#26382e",
                            color: "white"
                        }
                    }}
                >
                    <Refresh />
                </IconButton>

            </div>

            {open && (
                <div className={styles.drawer}>
                    <TarifDrawer setOpen={setOpen} />
                </div>
            )}

            {modalOpen && editedTarif && (
                <ModalTarif
                    tarif={editedTarif}
                    setOpen={setModalOpen}
                />
            )}

            {deleteModalOpen && (
                <ModalDeleteTarif
                    id={tarifToDelete}
                    setOpen={setDeleteModalOpen}
                    onSuccess={() => {
                        loadTarifs();
                        setSelectedTarifs([]);
                    }}
                />
            )}

        </div>
    );
}