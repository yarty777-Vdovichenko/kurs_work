import { TextField, Typography } from "@mui/material"
import { type ModalTarifProps } from "../../types/types"
import { useState } from "react"
import { putTarifs } from "../../api/tarifs.api";
import { ModalShell } from "./ForModal/ModalShell";
import useModalForm from "../../hooks/useModalForm";
import { ModaleTypography } from "../styled/ModaleComponents";

export default function ModalTarif({
    tarif,
    setOpen,
    onSuccess
}: ModalTarifProps & { onSuccess: () => void }) {

    const [name, setName] = useState(tarif!.name);
    const [capacity, setCapacity] = useState(tarif!.internet_capacity);
    const [minutes, setMinutes] = useState(tarif!.minutes);
    const [price, setPrice] = useState(tarif!.price);
    const [additional, setAdditional] = useState(tarif!.additional);

    const { handleSave,loading } = useModalForm({
        hasChanges: () =>
            name !== tarif!.name ||
            capacity !== tarif!.internet_capacity ||
            minutes !== tarif!.minutes ||
            price !== tarif!.price ||
            additional !== tarif!.additional,
        onSave: () => putTarifs(tarif!.id, {
            id: tarif!.id,
            name,
            internet_capacity: capacity,
            minutes,
            price,
            additional
        }),
        setOpen,
        onSuccess,
        noChangesMessage: "Ви нічого не змінили!"
    });

    return (
        <ModalShell onSave={handleSave} onCancel={() => setOpen(false)} loading={loading}>
            <ModaleTypography>
                Редагування тарифу
            </ModaleTypography>

            <TextField
                sx={{ backgroundColor: "white", width: "80%", borderRadius: 1 }}
                label="Назва"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <TextField
                sx={{ backgroundColor: "white", width: "80%", borderRadius: 1 }}
                label="ГБ"
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
            />

            <TextField
                sx={{ backgroundColor: "white", width: "80%", borderRadius: 1 }}
                label="Хв"
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
            />

            <TextField
                sx={{ backgroundColor: "white", width: "80%", borderRadius: 1 }}
                label="Ціна"
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
            />

            <TextField
                sx={{ backgroundColor: "white", width: "80%", borderRadius: 1 }}
                label="Додаткове"
                value={additional}
                onChange={(e) => setAdditional(e.target.value)}
            />
        </ModalShell>
    );
}