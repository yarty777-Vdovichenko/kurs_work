import { CircularProgress, IconButton, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import TarifDrawer from "../Components/Drawers/TarifDrawer.tsx";
import "../styles/table.css";
import { Clear, Edit, FilterAlt } from "@mui/icons-material";
import { type Tarif } from "../types/types.ts";
import { getTarifs } from "../api/tarifs.api.ts";
import ModalTarif from "../Components/Modals/ModalTarif.tsx";
import ModalDeleteTarif from "../Components/Modals/ModalDeleteTarif.tsx";
import type { RootState } from "../store/store.ts";
import { useSelector } from "react-redux";
import useRefresh from "../hooks/useRefresh.ts";
import { FloatingActionButtons } from "../Components/FloatingActionButtons/FloatingActionButtons.tsx";
import { SelectionBar } from "../Components/SelectionBar/SelectionBar.tsx";
import { EntityCard } from "../Components/EntityCard/EntityCard.tsx";
import { FilterPanel } from "../Components/Filter/FilterPanel.tsx";
import { FilterOptionGroup } from "../Components/Filter/FilterOptionGroup.tsx";
import useSnackbar from "../hooks/useSnackbar.ts";

export default function Tarifs() {
    const [isLoading, setIsLoading] = useState(true);

    const { showSnackbar } = useSnackbar();

    const { refresh, triggerRefresh } = useRefresh();

    const [open, setOpen] = useState(false);

    const [selectedTarifs, setSelectedTarifs] = useState<string[]>([]);

    const [tarifs, setTarifs] = useState<Tarif[]>([]);

    const [openFilter, setOpenFilter] = useState(false);

    const [filterSort, setFilterSort] = useState<string>("None");

    const [search, setSearch] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [editedTarif, setEditedTarif] = useState<Tarif | null>(null);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [tarifToDelete, setTarifToDelete] = useState<string>("");

    const role = useSelector((state: RootState) => state.auth.role);

    const displayedTarifs = useMemo(() => {
    let result = [...tarifs];

    if (search) {
        const searchLower = search.toLowerCase();
        result = result.filter(tarif => (tarif.name ?? "").toLowerCase().includes(searchLower));
    }

    if (filterSort === "Name") {
        result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filterSort === "Price") {
        result.sort((a, b) => a.price - b.price);
    }

    return result;
}, [tarifs, filterSort, search]);

    async function loadTarifs() {
        try {
            setIsLoading(true);
            const response = await getTarifs();
            setTarifs(response);
        }
        catch (error) {
            console.log(error);
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadTarifs();
    }, [refresh]);

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
            showSnackbar("Можна видаляти лише один тариф за раз","error");
            return;
        }

        setTarifToDelete(selectedTarifs[0]);
        setDeleteModalOpen(true);
    }

    return (
    <div className="tarifs-main">

        <div className="tarifs-search">

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
                <FilterAlt sx={{ fontSize: "28px", color: "white" }} />
            </IconButton>

        </div>

        {openFilter && (
            <FilterPanel>
                <FilterOptionGroup
                    title="Сортування"
                    options={[
                        { value: "None", label: "Без сортування" },
                        { value: "Name", label: "За назвою" },
                        { value: "Price", label: "За ціною" }
                    ]}
                    selectedValue={filterSort}
                    onSelect={setFilterSort}
                />
            </FilterPanel>
        )}

        <SelectionBar
            selectedCount={selectedTarifs.length}
            placeholder="Список доступних тарифів"
            selectedLabel="Вибрано тарифів"
            onDelete={deleteSelected}
            onClear={() => setSelectedTarifs([])}
            simpleClassName="tarifs-simple"
            menuClassName="tarifs-menu"
        />
        {isLoading?<div className="allCenter"><CircularProgress size={50} sx={{color:"white"}} /></div>:
        <div className="tarifs-cards">

            {displayedTarifs.map(tarif => (
                <EntityCard
                    key={tarif.id}
                    selected={selectedTarifs.includes(tarif.id)}
                    onClick={() => {
                        if (role !== "User") {
                            changeSelect(tarif.id);
                            setOpen(false);
                        }
                    }}
                    selectionStyle={selectedTarifs.includes(tarif.id) ? { backgroundColor: "#52b57d" } : {}}
                    actions={
                        role !== "User" && (
                            <IconButton onClick={(e) => {
                                e.stopPropagation();
                                setEditedTarif(tarif);
                                setModalOpen(true);
                            }}>
                                <Edit sx={{ color: "white" }} />
                            </IconButton>
                        )
                    }
                >
                    <span>ID: {tarif.id}</span>
                    <span>Назва: {tarif.name}</span>
                    <span>Інтернет: {tarif.internet_capacity}</span>
                    <span>Хвилини: {tarif.minutes}</span>
                    <span>Додатково: {tarif.additional}</span>
                    <span>Ціна: {tarif.price}</span>
                </EntityCard>
            ))}

        </div>
        }

        <FloatingActionButtons
            className={`tarifs-icons ${open ? "open" : ""}`}
            onAdd={role !== "User" ? () => setOpen(true) : undefined}
            onRefresh={triggerRefresh}
        />

        {open && (
            <div className="tarifs-drawer">
                <TarifDrawer setOpen={setOpen} />
            </div>
        )}

        {modalOpen && editedTarif && (
            <ModalTarif
                tarif={editedTarif}
                setOpen={setModalOpen}
                onSuccess={()=>triggerRefresh()}
            />
        )}

        {deleteModalOpen && (
            <ModalDeleteTarif
                id={tarifToDelete}
                setOpen={setDeleteModalOpen}
                onSuccess={() => {
                    triggerRefresh();
                    setSelectedTarifs([]);
                }}
            />
        )}

    </div>
);
}