import { Button, CircularProgress, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { type ReactNode } from "react";
import styles from "./DrawerShell.module.css";

interface DrawerShellProps {
    title: string;
    children: ReactNode;
    onConfirm: () => void;
    onClear: () => void;
    onClose: () => void;
    loading: boolean;
}

export function DrawerShell({ title, children, onConfirm, onClear, onClose, loading }: DrawerShellProps) {
    return (
        <div className={styles.drawerMain}>
            <h3>{title}</h3>

            {children}

            <IconButton
                onClick={onClose}
                sx={{ position: "absolute", top: 50, right: 10, color: "white" }}
            >
                <Close />
            </IconButton>

            <div style={{ width: "80%", display: "flex", gap: "10px", paddingTop: "50px" }}>
                <Button
                    sx={{
                        backgroundColor: "#9ACFB1", flex: 1, p: 2, color: "white", transition: "0.3s",
                        "&:hover": { backgroundColor: "#7aaa8f" }
                    }}
                    onClick={onConfirm}
                >
                    {loading ? <CircularProgress size={20} color="inherit" /> : "Підтвердити"}
                </Button>
                <Button
                    sx={{
                        backgroundColor: "#c86426", flex: 1, p: 2, color: "white", transition: "0.3s",
                        "&:hover": { backgroundColor: "#9b4e1f" }
                    }}
                    onClick={onClear}
                >
                    Очистити
                </Button>
            </div>
        </div>
    );
}