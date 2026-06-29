import { useState, type ReactNode } from "react";
import { Alert, Snackbar } from "@mui/material";
import { SnackbarContext } from "./SnackbarContext";
import type { Type } from "../types/types";



export function SnackbarProvider({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false);
    const [type,setType] = useState<Type>("info")
    const [message, setMessage] = useState("");

    const showSnackbar = (msg: string,typee:Type) => {
        setMessage(msg);
        setType(typee);
        setOpen(true);
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
                <Alert
                    onClose={() => setOpen(false)}
                    severity={type}
                    sx={{ backgroundColor: "#05311c", color: "white" }}
                >
                    {message}
                </Alert>
            </Snackbar> 
        </SnackbarContext.Provider>
    );
}