import { IconButton, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Add, Clear, Delete, Edit, FilterAlt, Refresh, Search } from "@mui/icons-material";
import { type FilterStatus, type Tarif, type Sub} from "../../types/types.ts";
import { deleteSim, deleteSub, filterSub, getSub, searchSub } from "../../api/subscriber.api.ts";
import styles from "./Abonents.module.css";
import SubDrawer from "../../Components/AbonentDrawer/AbonentDrawer.tsx";
import { getTarifs } from "../../api/tarifs.api.ts";
import EditSubModale from "../../Components/ModalSubscriber/ModalSubscriber.tsx";
import AddSimModale from "../../Components/ModalAddSim/ModalAddSim.tsx";
import ModalEditSim from "../../Components/ModalEditSim/ModalEditSim.tsx";

export default function Abonents() {

    const [open, setOpen] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);

    const [abonents, setAbonents] = useState<Sub[]>([]);
    const [tarifs, setTarifs] = useState<Tarif[]>([]);

    const [selectedAbonents, setSelectedAbonents] = useState<string[]>([]);

    const [filterSim, setFilterSim] = useState<FilterStatus>("");
    const [filterTarif, setFilterTarif] = useState<string>("");
    const [search, setSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [modalOpen, setModalOpen] = useState(false);
    const [modalAddSimOpen, setAddSimModalOpen] = useState(false);
    const [modalEditSimOpen, setModalEditSimOpen] = useState(false);
    const [editedAbonent, setEditedAbonent] = useState<Sub | null>(null);
    const [curId, setCurId] = useState("");
    const [curSimId, setSimCurId] = useState("");

    const [refresh, setRefresh] = useState(0);

    const isSearchMode = useRef(false);
    const lastSearch = useRef({ name: "", phone: "" });

    async function loadData(page: number) {
        try {
            if (isSearchMode.current) {
                const { name, phone } = lastSearch.current;
                const res = await searchSub(page, name, phone);
                setAbonents(res.items);
                setTotalPages(res.totalPages);
            } else if (filterSim !== "" || filterTarif !== "") {
                const status = filterSim;
                const res = await filterSub(page, status, filterTarif);
                setAbonents(res.items);
                setTotalPages(res.totalPages);
            } else {
                const res = await getSub(page);
                setAbonents(res.items);
                setTotalPages(res.totalPages);
            }
        } catch (err) {
            console.error(err);
        }
    }

    async function loadTarifs() {
        try {
            setTarifs(await getTarifs());
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        loadTarifs();
    }, []);

    useEffect(() => {
        loadData(currentPage);
    }, [currentPage, filterSim, filterTarif, refresh]);

    function resetToFirstPage() {
        isSearchMode.current = false;
        setSearch("");
        setCurrentPage(1);
    }

    function handleFilterSimChange(status: FilterStatus) {
        resetToFirstPage();
        setFilterSim(status);
    }

    function handleFilterTarifChange(tarifId: string) {
        resetToFirstPage();
        setFilterTarif(tarifId);
    }

    async function handleSearch() {
        if (!search.trim()) return;

        const digits = "0123456789";
        const hasDigit = [...search].some(c => digits.includes(c));

        const name = hasDigit ? "" : search;
        const phone = hasDigit ? search : "";
        lastSearch.current = { name, phone };
        isSearchMode.current = true;

        setFilterSim("");
        setFilterTarif("");
        setCurrentPage(1);

        try {
            const res = await searchSub(1, name, phone);
            setAbonents(res.items);
            setTotalPages(res.totalPages);
        } catch (err) {
            console.error(err);
        }
    }

    function handleClearSearch() {
        setSearch("");
        isSearchMode.current = false;
        lastSearch.current = { name: "", phone: "" };
        setCurrentPage(1);
        setRefresh(prev => prev + 1);
    }

    function changeSelect(id: string) {
        setSelectedAbonents(prev =>
            prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
        );
    }

    async function deleteSelected() {
        if (!window.confirm("Ви впевнені, що хочете видалити вибраних абонентів?")) return;

        try {
            await Promise.all(selectedAbonents.map(deleteSub));
            setSelectedAbonents([]);
            setRefresh(prev => prev + 1);
        } catch (err) {
            console.error(err);
            alert(err);
        }
    }

    async function deleteSimm({ subId, simId }: { subId: string; simId: string }) {
        try {
            await deleteSim({ subId, simId });
            setRefresh(prev => prev + 1);
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className={styles.mainUser}>
            <div className={styles.search}>
                <TextField
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSearch()}
                    placeholder="Пошук за ім'ям/номером..."
                    sx={{ backgroundColor: "white", flex: 1, borderRadius: 1 }}
                />

                <IconButton onClick={handleSearch}>
                    <Search sx={{ color: "white" }} />
                </IconButton>

                <IconButton onClick={handleClearSearch}>
                    <Clear sx={{ color: "white" }} />
                </IconButton>

                <IconButton
                    onClick={() => {
                        setOpenFilter(prev => !prev);
                        handleFilterSimChange("");
                        handleFilterTarifChange("");
                    }}
                >
                    <FilterAlt sx={{ fontSize: "28px", color: "white" }} />
                </IconButton>
            </div>

            {openFilter && (
                <div className={styles.filterMenu}>
                    <p>Фільтрація за статусом:</p>
                    <div className={styles.choose}>
                        <div
                            className={`${styles.variant} ${filterSim === "" ? styles.selected : ""}`}
                            onClick={() => handleFilterSimChange("")}
                        >
                            Всі
                        </div>
                        <div
                            className={`${styles.variant} ${filterSim === "active" ? styles.selected : ""}`}
                            onClick={() => handleFilterSimChange("active")}
                        >
                            Активні
                        </div>
                        <div
                            className={`${styles.variant} ${filterSim === "blocked" ? styles.selected : ""}`}
                            onClick={() => handleFilterSimChange("blocked")}
                        >
                            Заблокованні
                        </div>
                    </div>

                    <p>Фільтрація за тарифом:</p>
                    <div className={styles.choose}>
                        <div
                            className={`${styles.variant} ${filterTarif === "" ? styles.selected : ""}`}
                            onClick={() => handleFilterTarifChange("")}
                        >
                            Всі
                        </div>
                        {tarifs.map(tarif => (
                            <div
                                key={tarif.id}
                                className={`${styles.variant} ${filterTarif === tarif.id ? styles.selected : ""}`}
                                onClick={() => handleFilterTarifChange(tarif.id)}
                            >
                                {tarif.name}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {selectedAbonents.length === 0 ? (
                <div className={styles.simple}>
                    <p><i>Список абонентів</i></p>
                </div>
            ) : (
                <div className={styles.menu}>
                    <p>Вибрано абонентів: {selectedAbonents.length}</p>
                    <div>
                        <IconButton onClick={deleteSelected}>
                            <Delete sx={{ fontSize: "32px", color: "white" }} />
                        </IconButton>
                        <IconButton onClick={() => setSelectedAbonents([])}>
                            <Clear sx={{ fontSize: "32px", color: "white" }} />
                        </IconButton>
                    </div>
                </div>
            )}

            <div className={styles.cardsUser}>
                {abonents.map(ab => (
                    <div
                        key={ab.id}
                        className={`${styles.cardUser} ${selectedAbonents.includes(ab.id) ? styles.selected : ""}`}
                        onClick={() => changeSelect(ab.id)}
                    >
                        <div className={styles.innerData}>
                            <div className={styles.dataUser}>
                                <span>ID: {ab.id}</span>
                                <span>Імʼя: {ab.fullName}</span>
                                <span>Сімок: {ab.sims?.length ?? 0}</span>
                                <span>
                                    Дата створення:{" "}
                                    {new Date(ab.createdAt).toLocaleDateString("uk-UA", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                    })}
                                </span>
                            </div>

                            <div
                                className={styles.selectionUser}
                                style={selectedAbonents.includes(ab.id) ? { backgroundColor: "#52b57d" } : {}}
                            >
                                <IconButton
                                    onClick={e => {
                                        e.stopPropagation();
                                        setEditedAbonent(ab);
                                        setModalOpen(true);
                                    }}
                                >
                                    <Edit sx={{ color: "white" }} />
                                </IconButton>
                            </div>
                        </div>

                        <div className={styles.simcards}>
                            {ab.sims
                                .filter(sim => {
                                    const matchStatus = filterSim === "" || sim.status === filterSim;
                                    const matchTarif  = filterTarif === "" || sim.tarifId === filterTarif;
                                    return matchStatus && matchTarif;
                                })
                                .map(sim => (
                                <div key={sim.id} className={styles.simCard}>
                                    <div className={styles.simCard_data}>
                                        <span>ID: {sim.id}</span>
                                        <span>Номер: {sim.simNumber}</span>
                                        <span>Статус: {sim.status}</span>
                                        <span>
                                            Створено:{" "}
                                            {new Date(sim.createdAt).toLocaleDateString("uk-UA", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                            })}
                                        </span>
                                        <span>
                                            Тариф: {tarifs.find(t => t.id === sim.tarifId)?.name ?? "—"}
                                        </span>
                                    </div>

                                    <IconButton
                                        onClick={e => {
                                            e.stopPropagation();
                                            setCurId(ab.id);
                                            setSimCurId(sim.id);
                                            setModalEditSimOpen(true);
                                        }}
                                    >
                                        <Edit sx={{ color: "white" }} />
                                    </IconButton>

                                    <IconButton
                                        onClick={e => {
                                            e.stopPropagation();
                                            deleteSimm({ subId: ab.id, simId: sim.id });
                                        }}
                                    >
                                        <Delete sx={{ color: "white" }} />
                                    </IconButton>
                                </div>
                            ))}

                            <div className={styles.addSim}>
                                <IconButton
                                    sx={{ width: "100%", height: "100%" }}
                                    onClick={e => {
                                        e.stopPropagation();
                                        setCurId(ab.id);
                                        setAddSimModalOpen(true);
                                    }}
                                >
                                    <Add sx={{ color: "white" }} />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.pages}>
                <IconButton
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => p - 1)}
                    sx={{ color: "white" }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6l6 6z" />
                    </svg>
                </IconButton>

                <span style={{ color: "white" }}>{currentPage} / {totalPages}</span>

                <IconButton
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => p + 1)}
                    sx={{ color: "white" }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6z" />
                    </svg>
                </IconButton>
            </div>

            <div className={`${styles.iconsUsers} ${open ? styles.open : ""}`}>
                <IconButton
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    sx={{
                        backgroundColor: "#ec813f",
                        color: "white",
                        transition: "0.3s",
                        "&:hover": { backgroundColor: "#26382e" },
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8 6l4-4l4 4m-4-4v20" />
                    </svg>
                </IconButton>

                <IconButton
                    onClick={() => setOpen(true)}
                    sx={{
                        backgroundColor: "#ec813f",
                        color: "white",
                        transition: "0.3s",
                        "&:hover": { backgroundColor: "#26382e" },
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2" />
                    </svg>
                </IconButton>

                <IconButton
                    onClick={() => setRefresh(prev => prev + 1)}
                    sx={{
                        backgroundColor: "#ec813f",
                        color: "white",
                        transition: "0.3s",
                        "&:hover": { backgroundColor: "#26382e" },
                    }}
                >
                    <Refresh />
                </IconButton>
            </div>

            {open && (
                <div className={styles.drawer}>
                    <SubDrawer setOpen={setOpen} onSuccess={() => setRefresh(prev => prev + 1)} />
                </div>
            )}

            {modalAddSimOpen && (
                <AddSimModale
                    setOpen={setAddSimModalOpen}
                    subId={curId}
                    onSuccess={() => setRefresh(prev => prev + 1)}
                />
            )}

            {modalOpen && (
                <EditSubModale
                    setOpen={setModalOpen}
                    sub={editedAbonent!}
                    onSuccess={() => setRefresh(prev => prev + 1)}
                />
            )}

            {modalEditSimOpen && (
                <ModalEditSim
                    setOpen={setModalEditSimOpen}
                    simId={curSimId}
                    subId={curId}
                    onSuccess={() => setRefresh(prev => prev + 1)}
                />
            )}
        </div>
    );
}