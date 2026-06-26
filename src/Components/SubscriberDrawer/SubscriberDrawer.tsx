import { Checkbox, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { postSub } from "../../api/subscriber.api";
import type { Tarif } from "../../types/types";
import { getTarifs } from "../../api/tarifs.api";
import { DrawerShell } from "../DrawerShell/DrawerShell";
import useDrawerForm from "../../hooks/useDrawerForm";

export default function SubscriberDrawer({ setOpen, onSuccess }: { setOpen: (value: boolean) => void, onSuccess?: () => void }) {
    const [name, setName] = useState<string>("");
    const [checked, setChecked] = useState(false);
    const [tarifs, setTarifs] = useState<Tarif[]>();
    const [status, setStatus] = useState<"active" | "blocked">("active");
    const [tarifId, setTarifId] = useState<string>("");

    async function loadTarifs() {
        try {
            const response = await getTarifs();
            setTarifs(response);
        }
        catch (error: any) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadTarifs();
    }, []);

    const { handleSave, error, created, resetMessages } = useDrawerForm({
        validate: () => {
            if (tarifId === "" && checked === true) return "Виберіть тариф";
            return null;
        },
        onSave: () => postSub({
            fullName: name,
            sims: checked && tarifId ? [{ status, tarifId }] : []
        }),
        onSuccess
    });

    const clearForm = () => {
        setName("");
        resetMessages();
    };

    return (
        <DrawerShell
            title="Додати абонента"
            onConfirm={handleSave}
            onClear={clearForm}
            onClose={() => setOpen(false)}
            error={error}
            created={created}
        >
            <TextField
                variant="filled" label="ПІБ"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ backgroundColor: "white", width: "80%", borderRadius: 1 }}
            />
            <Checkbox sx={{ color: "white" }} checked={checked} onChange={(e) => setChecked(e.target.checked)} />
            <p>Створити сімку?</p>
            {checked &&
                <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "80%", alignItems: "center" }}>
                    <p>Статус:</p>
                    <Select sx={{ backgroundColor: "white", width: "80%", borderRadius: 1 }} value={status} onChange={(e) => setStatus(e.target.value as "active" | "blocked")}>
                        <MenuItem value="active">Активний</MenuItem>
                        <MenuItem value="blocked">Заблокований</MenuItem>
                    </Select>
                    <p>Тариф:</p>
                    <Select sx={{ backgroundColor: "white", width: "80%", borderRadius: 1 }} value={tarifId ?? ""} onChange={(e) => setTarifId(e.target.value)}>
                        {tarifs?.map(tarif => <MenuItem key={tarif.id} value={tarif.id}>{tarif.name}</MenuItem>)}
                    </Select>
                </div>
            }
        </DrawerShell>
    );
}