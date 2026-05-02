import { IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Add, Clear, Delete, Edit, FilterAlt, Refresh } from "@mui/icons-material";
import { type Tarif, type Sub } from "../../types/types.ts";
import { deleteSim, deleteSub, getSub } from "../../api/subscriber.api.ts";
import styles from "./Abonents.module.css";
import SubDrawer from "../../Components/AbonentDrawer/AbonentDrawer.tsx"
import { getTarifs } from "../../api/tarifs.api.ts";
import EditSubModale from "../../Components/ModalSubscriber/ModalSubscriber.tsx"
import AddSimModale from "../../Components/ModalAddSim/ModalAddSim.tsx"
import ModalEditSim from "../../Components/ModalEditSim/ModalEditSim.tsx";

export default function Abonents() {
    const [open, setOpen] = useState(false);
    const [selectedAbonents, setSelectedAbonents] = useState<string[]>([]);
    const [abonents, setAbonents] = useState<Sub[]>([]);
    const [filterAbonents, setFilterAbonents] = useState<Sub[]>([]);
    const [openFilter, setOpenFilter] = useState(false);
    const [filterSort, setFilterSort] = useState<string>("None");
    const [search, setSearch] = useState("");
    const [curId,setCurId]=useState<string>("");
    const [curSimId,setSimCurId]=useState<string>("");

    const [modalOpen, setModalOpen] = useState(false);
    const [modalAddSimOpen, setAddSimModalOpen] = useState(false);
    const [modalEditSimOpen, setModalEditSimOpen] = useState(false);


    const [editedAbonent, setEditedAbonent] = useState<Sub | null>(null);
    const [currentPage,newCurrentPage]=useState<number>(1);
    const [totalPages,setTotalPages]=useState<number>(1);

    const [tarifs,setTarifs]=useState<Tarif[]>([]);

    const [refresh,setRefresh]=useState<number>(0);

    async function deleteSimm({subId,simId}:{subId:string,simId:string}) {
        try {
            await deleteSim({ subId, simId });
            await loadAbonents();
        } catch (err) {
            console.log(err);
        }
    }

    async function loadTarifs(){
        try{
            const response = await getTarifs();
            setTarifs(response)
        }
        catch(error:any)
        {
            console.log(error);
        }
    }

    useEffect(()=>{
        loadTarifs();
    },[])

    useEffect(() => {
        let result = [...abonents];

        if (search) {
            const searchLower = search.toLowerCase();
            result = result.filter(ab =>
                (ab.fullName ?? "").toLowerCase().includes(searchLower)
            );
        }

        if (filterSort === "Name") {
            result.sort((a, b) => a.fullName.localeCompare(b.fullName));
        } else if (filterSort === "Date") {
            result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        }

        setFilterAbonents(result);
    }, [abonents, filterSort, search]);

    async function loadAbonents() {
        try {
            const response = await getSub(currentPage);
            setAbonents(response.items);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadAbonents();
    }, [currentPage,refresh]);

    function changeSelect(id: string) {
        setSelectedAbonents(prev =>
            prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
        );
    }

    async function deleteSelected() {
        const isConfirmed = window.confirm(
            "Ви впевнені, що хочете видалити вибраних абонентів?"
        );

        if (!isConfirmed) return;

        try {
            await Promise.all(selectedAbonents.map(id => deleteSub(id)));
            setAbonents(prev => prev.filter(t => !selectedAbonents.includes(t.id)));
            setSelectedAbonents([]);
        } catch (error: any) {
            console.log(error);
            alert(error);
        }
    }

    return (
        <div className={styles.mainUser}>
            <div className={styles.search}>
                <TextField
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Пошук абонента..."
                    sx={{ backgroundColor: "white", flex: 1, borderRadius: 1 }}
                />

                <IconButton onClick={() => setSearch("")}>
                    <Clear sx={{ color: "white" }} />
                </IconButton>

                <IconButton onClick={() => {
                    setOpenFilter(prev => !prev);
                    setFilterSort("None");
                }}>
                    <FilterAlt sx={{ fontSize: "28px", color: "white" }} />
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
                            За іменем
                        </div>
                        <div
                            className={`${styles.variant} ${filterSort === "Date" ? styles.selected : ""}`}
                            onClick={() => setFilterSort("Date")}
                        >
                            За датою
                        </div>
                    </div>
                </div>
            )}

            {selectedAbonents.length === 0 && (
                <div className={styles.simple}>
                    <p><i>Список абонентів</i></p>
                </div>
            )}

            {selectedAbonents.length > 0 && (
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
                {filterAbonents.map(ab => (
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
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setEditedAbonent(ab);
                                        setModalOpen(true);
                                        setRefresh(prev => prev+=1);
                                    }}
                                >
                                    <Edit sx={{ color: "white" }} />
                                </IconButton>
                                <IconButton
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurId(ab.id);
                                        setAddSimModalOpen(true);
                                        setRefresh(prev => prev+=1);
                                    }}
                                >
                                    <Add sx={{color:"white"}}/>
                                </IconButton>
                            </div>
                        </div>
                        <div className={styles.simcards}>
                        {ab.sims.map(sim=>(
                            <div className={styles.simCard}>
                                <div className={styles.simCard_data}>
                                    <span>ID: {sim.id}</span>
                                    <span>Номер: {sim.simNumber}</span>
                                    <span>Статус: {sim.status}</span>
                                    <span>Створено: {new Date(sim.createdAt).toLocaleDateString("uk-UA", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                        })}</span>
                                    <span>Тариф: {tarifs?.find(tarif => tarif.id == sim.tarifId)?.name}</span>
                                </div>
                                <IconButton
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurId(ab.id);
                                        setSimCurId(sim.id);
                                        setRefresh(prev => prev+=1);
                                        setModalEditSimOpen(true);
                                    }}
                                >
                                    <Edit sx={{ color: "white" }} />
                                </IconButton>
                                <IconButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const subId=ab.id;
                                    const simId=sim.id;
                                    deleteSimm({subId,simId});
                                    setRefresh(prev => prev+=1)
                                    }}
                                    >
                                        <Delete sx={{color:"white"}}/>
                                    </IconButton>
                                
                            </div>
                        ))}
                        <div className={styles.addSim}>
                            <IconButton
                            sx={{width:"100%",height:"100%",}}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurId(ab.id);
                                        setAddSimModalOpen(true);
                                    }}
                                >
                                    <Add sx={{color:"white"}}/>
                                </IconButton>
                        </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.pages}>
                <IconButton
                    disabled={currentPage === 1}
                    onClick={() => newCurrentPage(p => p - 1)}
                    sx={{ color: "white" }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6l6 6z"/>
                    </svg>
                </IconButton>

                <span style={{ color: "white" }}>{currentPage} / {totalPages}</span>

                <IconButton
                    disabled={currentPage === totalPages}
                    onClick={() => newCurrentPage(p => p + 1)}
                    sx={{ color: "white" }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6z"/>
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
                        "&:hover": { backgroundColor: "#26382e", color: "white" },
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
                        "&:hover": { backgroundColor: "#26382e", color: "white" },
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2" />
                    </svg>
                </IconButton>
                <IconButton
                    onClick={() => loadAbonents()}
                    sx={{
                        backgroundColor: "#ec813f",
                        color: "white",
                        transition: "0.3s",
                        "&:hover": { backgroundColor: "#26382e", color: "white" },
                    }}
                >
                    <Refresh />
                </IconButton>
            </div>

            {open && (
                <div className={styles.drawer}>
                    <SubDrawer setOpen={setOpen} onSuccess={() => setRefresh(prev => prev + 1)}></SubDrawer>
                </div>
            )}

            {modalAddSimOpen && (
                <AddSimModale setOpen={setAddSimModalOpen} subId={curId} onSuccess={() => setRefresh(prev => prev + 1)}></AddSimModale>
            )}

            {modalOpen && (
                <EditSubModale setOpen={setModalOpen} sub={editedAbonent!} onSuccess={() => setRefresh(prev => prev + 1)}></EditSubModale>
            )}
            {modalEditSimOpen && 
            <ModalEditSim setOpen={setModalEditSimOpen} simId={curSimId} subId={curId} onSuccess={() => setRefresh(prev => prev + 1)}></ModalEditSim>}
        </div>
    );
}