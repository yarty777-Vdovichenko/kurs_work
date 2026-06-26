import { TextField } from "@mui/material";
import { useState } from "react";
import { postTarifs } from "../../api/tarifs.api";
import { DrawerShell } from "../DrawerShell/DrawerShell";
import useDrawerForm from "../../hooks/useDrawerForm";

export default function TarifDrawer({ setOpen, onSuccess }: { setOpen: (value: boolean) => void, onSuccess?: () => void }) {
    const [name, setName] = useState<string>("");
    const [capasity, setCapacity] = useState<string>("");
    const [minutes, setMinutes] = useState<string>("");
    const [additional, setAdditional] = useState<string>("");
    const [price, setPrice] = useState<string>("");

    const { handleSave, error, created, resetMessages } = useDrawerForm({
        validate: () => {
            if (price === "" || capasity === "" || minutes === "" || name === "" || additional === "") {
                return "Заповніть всі поля";
            }
            if (Number(price) > 10000 || Number(price) < 1) {
                return "Не правильна ціна";
            }
            return null;
        },
        onSave: () => postTarifs(name, Number(capasity), Number(minutes), additional, Number(price)),
        onSuccess
    });

    const clearForm = () => {
        setName("");
        setAdditional("");
        setCapacity("");
        setMinutes("");
        setPrice("");
        resetMessages();
    };

    return (
        <DrawerShell
            title="Створити тариф"
            onConfirm={handleSave}
            onClear={clearForm}
            onClose={() => setOpen(false)}
            error={error}
            created={created}
        >
            <p>Назва</p>
            <TextField sx={{ backgroundColor: "white", width: "80%", borderRadius: 1 }} value={name} onChange={(e) => setName(e.target.value)} />

            <p>Інтернет</p>
            <TextField sx={{ backgroundColor: "white", width: "80%", borderRadius: 1 }} value={capasity} onChange={(e) => setCapacity(e.target.value)} />

            <p>Хвилини</p>
            <TextField sx={{ backgroundColor: "white", width: "80%", borderRadius: 1 }} value={minutes} onChange={(e) => setMinutes(e.target.value)} />

            <p>Ціна</p>
            <TextField sx={{ backgroundColor: "white", width: "80%", borderRadius: 1 }} value={price} onChange={(e) => setPrice(e.target.value)} />

            <p>Додаткове</p>
            <TextField sx={{ backgroundColor: "white", width: "80%", borderRadius: 1 }} value={additional} onChange={(e) => setAdditional(e.target.value)} />
        </DrawerShell>
    );
}