import { Button } from "@mui/material";
import { type ReactNode } from "react";
import styles from "./ModalShell.module.css";

interface ModalShellProps {
    children: ReactNode;
    onSave: () => void;
    onCancel: () => void;
    saveLabel?: string;
}

export function ModalShell({ children, onSave, onCancel, saveLabel = "Зберегти" }: ModalShellProps) {
    return (
        <div className={styles.all}>
            <div className={styles.modal}>
                {children}
                <div className={styles.buttons}>
                    <Button sx={{ backgroundColor: "#9ACFB1", color: "white" }} onClick={onSave}>
                        {saveLabel}
                    </Button>
                    <Button sx={{ backgroundColor: "#ec813f", color: "white" }} onClick={onCancel}>
                        Скасувати
                    </Button>
                </div>
            </div>
        </div>
    );
}