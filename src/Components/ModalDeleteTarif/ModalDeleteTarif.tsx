import { MenuItem, Select } from "@mui/material"
import { type ModalDelteTarif, type Tarif } from "../../types/types"
import { useEffect, useState } from "react"
import { deleteTarifs, getTarifs } from "../../api/tarifs.api";
import { ModalShell } from "../Modal/ModalShell";
import useModalForm from "../../hooks/useModalForm";
import { ModaleTypography } from "../styled/ModaleComponents";

export default function ModalDeleteTarif({ id, setOpen, onSuccess }: ModalDelteTarif) {
    const [tarifs, setTarifs] = useState<Tarif[]>()
    const [tarifId, setTarifId] = useState<string>("")

    async function loadTarifs() {
        try {
            const response = await getTarifs();
            setTarifs(response)
        }
        catch (error: any) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadTarifs()
    }, [])

    const { handleSave } = useModalForm({
        hasChanges: () => tarifId !== "",
        onSave: () => deleteTarifs(id, tarifId),
        setOpen,
        onSuccess,
        noChangesMessage: "Виберіть тариф"
    });

    return (
        <ModalShell onSave={handleSave} onCancel={() => setOpen(false)}>
            <ModaleTypography>Тариф на який ви хочете замінити</ModaleTypography>
            <Select sx={{ backgroundColor: "white", width: "80%", borderRadius: 1 }} value={tarifId ?? ""} onChange={(e) => setTarifId(e.target.value)}>
                {tarifs?.filter(tarif => tarif.id !== id)
                    .map(tarif => <MenuItem key={tarif.id} value={tarif.id}>{tarif.name}</MenuItem>)}
            </Select>
        </ModalShell>
    )
}