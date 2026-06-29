import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Add, Clear, Edit, FilterAlt, Search } from "@mui/icons-material";
import { type FilterStatus, type Tarif, type Sub } from "../../types/types.ts";
import { deleteSim, deleteSub, filterSub, getSub, searchSub } from "../../api/subscriber.api.ts";
import styles from "./Abonents.module.css";
import SubDrawer from "../../Components/Drawers/SubscriberDrawer.tsx";
import { getTarifs } from "../../api/tarifs.api.ts";
import EditSubModale from "../../Components/Modals/ModalSubscriber.tsx";
import AddSimModale from "../../Components/Modals/ModalAddSim.tsx";
import ModalEditSim from "../../Components/Modals/ModalEditSim.tsx";
import useRefresh from "../../hooks/useRefresh.ts";
import { FloatingActionButtons } from "../../Components/FloatingActionButtons/FloatingActionButtons.tsx";
import { SelectionBar } from "../../Components/SelectionBar/SelectionBar.tsx";
import { SubscriberSimRows } from "./SubscriberSimRows.tsx";
import useSnackbar from "../../hooks/useSnackbar.ts";
import useConfirm from "../../hooks/useConfirm.ts";

export default function Abonents() {
    const [isLoading, setIsLoading] = useState(true);

    const { confirm, openDialog, message, handleConfirm, handleCancel } = useConfirm();

    const {showSnackbar} = useSnackbar();
    const { refresh, triggerRefresh } = useRefresh();

    const [open, setOpen] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const [expandedSub, setExpandedSub] = useState<string | null>(null);

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

    const isSearchMode = useRef(false);
    const lastSearch = useRef({ name: "", phone: "" });

   async function loadData(page: number) {
        try {
            setIsLoading(true);
            let res;
            if (isSearchMode.current) {
                const { name, phone } = lastSearch.current;
                res = await searchSub(page, name, phone);
            } else if (filterSim !== "" || filterTarif !== "") {
                res = await filterSub(page, filterSim, filterTarif);
            } else {
                res = await getSub(page);
            }
            setAbonents(res.items);
            setTotalPages(res.totalPages);
        } catch (err) {
            console.error(err);
        }
        finally{
            setIsLoading(false);
        }
    }

    async function loadTarifs() {
        try {
            setTarifs(await getTarifs());
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => { loadTarifs(); }, []);
    useEffect(() => { loadData(currentPage); }, [currentPage, filterSim, filterTarif, refresh]);

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
        const hasDigit = [...search].some(c => "0123456789".includes(c));
        const name = hasDigit ? "" : search;
        const phone = hasDigit ? search : "";
        
        lastSearch.current = { name, phone };
        isSearchMode.current = true;
        setFilterSim("");
        setFilterTarif("");
        setCurrentPage(1);
        
        await loadData(1);
    }

    function handleClearSearch() {
        setSearch("");
        isSearchMode.current = false;
        lastSearch.current = { name: "", phone: "" };
        setCurrentPage(1);
        triggerRefresh()
    }

    function changeSelect(id: string) {
        setSelectedAbonents(prev =>
            prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
        );
    }

    async function deleteSelected() {
        const isConfirmed = await confirm("Ви впевнені?");
        if (!isConfirmed) return;
        try {
            await Promise.all(selectedAbonents.map(deleteSub));
            setSelectedAbonents([]);
            triggerRefresh()
            showSnackbar("Абонентів видалено", "success");
        } catch (error) {
            console.error(error);
            const message = error instanceof Error ? error.message : String(error);
            showSnackbar(message,"error");
        }
    }

    async function deleteSimm({ subId, simId }: { subId: string; simId: string }) {
        try {
            await deleteSim({ subId, simId });
            triggerRefresh()
            showSnackbar("Сімкарту видалено", "success");
        } catch (err) {
            console.error(err);
        }
    }

    function formatDate(date: string | Date) {
        return new Date(date).toLocaleDateString("uk-UA", {
            day: "2-digit", month: "2-digit", year: "numeric",
        });
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
                <IconButton onClick={handleSearch}><Search sx={{ color: "white" }} /></IconButton>
                <IconButton onClick={handleClearSearch}><Clear sx={{ color: "white" }} /></IconButton>
                <IconButton onClick={() => {
                    setOpenFilter(prev => !prev);
                    handleFilterSimChange("");
                    handleFilterTarifChange("");
                }}>
                    <FilterAlt sx={{ fontSize: "28px", color: "white" }} />
                </IconButton>
            </div>

            {openFilter && (
                <div className={styles.filterMenu}>
                    <p>Фільтрація за статусом:</p>
                    <div className={styles.choose}>
                        {(["", "active", "blocked"] as FilterStatus[]).map(s => (
                            <div
                                key={s}
                                className={`${styles.variant} ${filterSim === s ? styles.selected : ""}`}
                                onClick={() => handleFilterSimChange(s)}
                            >
                                {s === "" ? "Всі" : s === "active" ? "Активні" : "Заблоковані"}
                            </div>
                        ))}
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

            <SelectionBar
                selectedCount={selectedAbonents.length}
                placeholder="Список абонентів"
                selectedLabel="Вибрано абонентів"
                onDelete={deleteSelected}
                onClear={() => setSelectedAbonents([])}
                simpleClassName={styles.simple}
                menuClassName={styles.menu}
            />
            {isLoading?<div className={styles.allCenter}><CircularProgress size={50} sx={{color:"white"}} /></div>:
            <>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>ID</th>
                            <th>ПІБ</th>
                            <th>Кількість SIM</th>
                            <th>Дата створення</th>
                            <th>Дії</th>
                        </tr>
                    </thead>
                    <tbody>
                        {abonents
                            .filter(ab => {
                                const hasFilter = filterSim !== "" || filterTarif !== "";
                                return hasFilter ? ab.sims.length > 0 : true;
                            })
                            .map(ab => (
                            <>
                                <tr
                                    key={ab.id}
                                    className={`${styles.subRow} ${selectedAbonents.includes(ab.id) ? styles.selectedRow : ""}`}
                                    onClick={() => changeSelect(ab.id)}
                                >
                                    <td>
                                        <button
                                            className={styles.expandBtn}
                                            onClick={e => {
                                                e.stopPropagation();
                                                setExpandedSub(prev => prev === ab.id ? null : ab.id);
                                            }}
                                        >
                                            {expandedSub === ab.id ? "▲" : "▼"}
                                        </button>
                                    </td>
                                    <td className={styles.idCell}>{ab.id}</td>
                                    <td>{ab.fullName}</td>
                                    <td>{ab.sims?.length ?? 0}</td>
                                    <td>{formatDate(ab.createdAt)}</td>
                                    <td onClick={e => e.stopPropagation()}>
                                        <IconButton
                                            size="small"
                                            onClick={() => {
                                                setEditedAbonent(ab);
                                                setModalOpen(true);
                                            }}
                                        >
                                            <Edit sx={{ color: "white" }} />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() => {
                                                setCurId(ab.id);
                                                setAddSimModalOpen(true);
                                            }}
                                        >
                                            <Add sx={{ color: "white" }} />
                                        </IconButton>
                                    </td>
                                </tr>

                                {expandedSub === ab.id && (
                                    <tr key={`${ab.id}-sims`} className={styles.simsRow}>
                                        <td colSpan={6}>
                                            <SubscriberSimRows
                                                sims={ab.sims}
                                                tarifs={tarifs}
                                                filterSim={filterSim}
                                                filterTarif={filterTarif}
                                                formatDate={formatDate}
                                                onEditSim={(simId) => {
                                                    setCurId(ab.id);
                                                    setSimCurId(simId);
                                                    setModalEditSimOpen(true);
                                                }}
                                                onDeleteSim={(simId) => deleteSimm({ subId: ab.id, simId })}
                                            />
                                        </td>
                                    </tr>
                                )}
                            </>
                        ))}
                    </tbody>
                </table>
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
            </>
            }

            <FloatingActionButtons
                className={`${styles.iconsUsers} ${open ? styles.open : ""}`}
                onAdd={() => setOpen(true)}
                onRefresh={triggerRefresh}
            />

            {open && (
                <div className={styles.drawer}>
                    <SubDrawer setOpen={setOpen} onSuccess={triggerRefresh} />
                </div>
            )}
            {modalAddSimOpen && (
                <AddSimModale setOpen={setAddSimModalOpen} subId={curId} onSuccess={triggerRefresh} />
            )}
            {modalOpen && (
                <EditSubModale setOpen={setModalOpen} sub={editedAbonent!} onSuccess={triggerRefresh} />
            )}
            {modalEditSimOpen && (
                <ModalEditSim setOpen={setModalEditSimOpen} simId={curSimId} subId={curId} onSuccess={triggerRefresh} />
            )}
            <Dialog open={openDialog} onClose={handleCancel}
            PaperProps={{
                sx: { backgroundColor: "#196441", color: "white" }
            }}>
                <DialogTitle sx={{fontSize:"22px",fontWeight:"700"}}>Підтвердження</DialogTitle>
                <DialogContent>{message}</DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} sx={{color:"#ec813f",fontWeight:"700"}}>Скасувати</Button>
                    <Button onClick={handleConfirm} sx={{color:"#6beeb1",fontWeight:"700"}}>ОК</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}