import { MenuItem, Select } from "@mui/material"
import { type ModalAddSimProps, type Tarif } from "../../types/types"
import { useEffect, useState } from "react"
import { addSim } from "../../api/subscriber.api";
import { getTarifs } from "../../api/tarifs.api";
import { ModalShell } from "../Modal/ModalShell";
import useModalForm from "../../hooks/useModalForm";
import { ModaleTypography } from "../styled/ModaleComponents";

export default function ModalAddSim({ subId, setOpen, onSuccess }: ModalAddSimProps) {
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
        onSave: () => addSim({ subId, tarifId }),
        setOpen,
        onSuccess,
        noChangesMessage: "Виберіть тариф"
    });

    return (
        <ModalShell onSave={handleSave} onCancel={() => setOpen(false)}>
            <ModaleTypography>Тариф</ModaleTypography>
            <Select sx={{ backgroundColor: "white", width: "80%", borderRadius: 1 }} value={tarifId ?? ""} onChange={(e) => setTarifId(e.target.value)}>
                {tarifs?.map(tarif => <MenuItem key={tarif.id} value={tarif.id}>{tarif.name}</MenuItem>)}
            </Select>
        </ModalShell>
    )
}