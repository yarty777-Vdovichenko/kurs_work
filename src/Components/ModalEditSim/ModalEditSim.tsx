import { MenuItem, Select } from "@mui/material"
import { type Sim, type ModalEditSimProps, type Status, type Tarif } from "../../types/types"
import { useEffect, useState } from "react"
import { getSimById, editSim } from "../../api/subscriber.api";
import { getTarifs } from "../../api/tarifs.api";
import { ModalShell } from "../Modal/ModalShell";
import useModalForm from "../../hooks/useModalForm";
import { ModaleTypography } from "../styled/ModaleComponents";

export default function ModalEditSim({ subId, simId, setOpen, onSuccess }: ModalEditSimProps) {
    const [tarifs, setTarifs] = useState<Tarif[]>()
    const [tarifId, setTarifId] = useState<string>("1")
    const [status, setStatus] = useState<Status>("active")
    const [sim, setSim] = useState<Sim>()

    async function loadTarifs() {
        try {
            const response = await getTarifs();
            setTarifs(response)
        }
        catch (error: any) {
            console.log(error);
        }
    }

    async function getsimCardById() {
        try {
            const simm = await getSimById({ subId, simId });
            setStatus(simm.status);
            setTarifId(simm.tarifId);
            setSim(simm);
        }
        catch (error: any) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadTarifs();
        getsimCardById();
    }, [])

    const { handleSave } = useModalForm({
        hasChanges: () => tarifId !== sim?.tarifId || status !== sim?.status,
        onSave: () => editSim({ tarifId, status, subId, simId }),
        setOpen,
        onSuccess,
        noChangesMessage: "Ви нічого не змінили"
    });

    function handleSaveWithValidation() {
        if (tarifId === "" || tarifId === "1") {
            alert("Не коректний траиф");
            return;
        }
        handleSave();
    }

    return (
        <ModalShell onSave={handleSaveWithValidation} onCancel={() => setOpen(false)}>
            <ModaleTypography>Статус</ModaleTypography>
            <Select
                variant="filled"
                sx={{ backgroundColor: "white", width: "80%", borderRadius: 1 }}
                value={status} onChange={(e) => setStatus(e.target.value)}>
                <MenuItem value={"active"}>Активна</MenuItem>
                <MenuItem value={"blocked"}>Заблокована</MenuItem>
            </Select>
            <ModaleTypography>Тариф</ModaleTypography>
            <Select sx={{ backgroundColor: "white", width: "80%", borderRadius: 1 }} value={tarifId} onChange={(e) => setTarifId(e.target.value)}>
                {tarifs?.map(tarif => <MenuItem key={tarif.id} value={tarif.id}>{tarif.name}</MenuItem>)}
            </Select>
        </ModalShell>
    )
}