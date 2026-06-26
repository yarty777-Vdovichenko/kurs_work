import { MenuItem, Select } from "@mui/material";
import { type Role, type ModalUserProps } from "../../types/types";
import { useEffect, useState } from "react";
import { patchUser } from "../../api/users.api";
import { ModalShell } from "../Modal/ModalShell";
import useModalForm from "../../hooks/useModalForm";
import { ModaleTypography } from "../styled/ModaleComponents";

export default function ModalUser({
    role,
    id,
    setOpen,
    onSuccess
}: ModalUserProps & { onSuccess: () => void }) {

    const [newRole, setNewRole] = useState<Role>(role);

    useEffect(() => {
        setNewRole(role);
    }, [role]);

    const { handleSave } = useModalForm({
        hasChanges: () => newRole !== role,
        onSave: () => patchUser(id, { role: newRole }),
        setOpen,
        onSuccess,
        noChangesMessage: "Ви не змінили роль!"
    });

    return (
        <ModalShell onSave={handleSave} onCancel={() => setOpen(false)}>
            <ModaleTypography>Роль:</ModaleTypography>
            <Select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value as Role)}
                sx={{ backgroundColor: "white", width: "80%", borderRadius: 1 }}
            >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="User">User</MenuItem>
            </Select>
        </ModalShell>
    );
}