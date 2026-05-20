import { Button, MenuItem, Select } from "@mui/material";
import styles from "./ModalUser.module.css";
import { type Role, type ModalUserProps } from "../../types/types";
import { useEffect, useState } from "react";
import { patchUser } from "../../api/users.api";

export default function ModalUser({
    role,
    id,
    setOpen,
    onSuccess
}: ModalUserProps & { onSuccess: () => void }) {

    const [newRole, setNewRole] = useState<Role>(role);

    // 🔥 важливо: щоб при відкритті модалки завжди синхронізувалось
    useEffect(() => {
        setNewRole(role);
    }, [role]);

    async function PatchUserHelper() {
        if (newRole === role) {
            alert("Ви не змінили роль!");
            return;
        }

        try {
            await patchUser(id, { role: newRole });

            setOpen(false);
            onSuccess();

        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className={styles.all}>
            <div className={styles.modal}>

                <p className={styles.title}>Роль:</p>

                <Select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as Role)}
                    sx={{
                        backgroundColor: "white",
                        width: "80%",
                        borderRadius: 1
                    }}
                >
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="User">User</MenuItem>
                </Select>

                <div className={styles.buttons}>
                    <Button
                        sx={{ backgroundColor: "#9ACFB1", color: "white" }}
                        onClick={PatchUserHelper}
                    >
                        Зберегти
                    </Button>

                    <Button
                        sx={{ backgroundColor: "#ec813f", color: "white" }}
                        onClick={() => setOpen(false)}
                    >
                        Скасувати
                    </Button>
                </div>

            </div>
        </div>
    );
}