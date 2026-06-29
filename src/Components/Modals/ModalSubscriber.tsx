import { TextField } from "@mui/material"
import { type ModalSubProps } from "../../types/types"
import { useState } from "react"
import { putSub } from "../../api/subscriber.api";
import { ModalShell } from "./ForModal/ModalShell";
import useModalForm from "../../hooks/useModalForm";

export default function ModalUser({ sub, setOpen, onSuccess }: ModalSubProps) {
    const [name, setName] = useState<string>(sub.fullName);

    const { handleSave, loading } = useModalForm({
        hasChanges: () => sub.fullName !== name,
        onSave: () => putSub(sub.id, { ...sub, fullName: name }),
        setOpen,
        onSuccess,
        noChangesMessage: "Ви не змінили імені!"
    });

    return (
        <ModalShell onSave={handleSave} onCancel={() => setOpen(false)} loading={loading}>
            <TextField
                variant="filled"
                label="ПІБ"
                sx={{ backgroundColor: "white", borderRadius: 1, width: "100%" }}
                value={name}
                onChange={(e) => { setName(e.target.value) }} />
        </ModalShell>
    )
}