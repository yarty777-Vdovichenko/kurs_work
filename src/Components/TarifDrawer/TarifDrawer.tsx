import { Box, Button, IconButton, TextField } from "@mui/material"
import styles from "./TarifDrawer.module.css";
import { Close } from "@mui/icons-material"
import { useState } from "react"
import { postTarifs } from "../../api/tarifs.api";

export default function TarifDrawer({
    setOpen,
    onSuccess
}: {
    setOpen: (value: boolean) => void;
    onSuccess?: () => void;
}) {

    const [name, setName] = useState<string>("");
    const [capasity, setCapacity] = useState<string>("");
    const [minutes, setMinutes] = useState<string>("");
    const [additional, setAdditional] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [created, setCreated] = useState<string>("");

    const sendUser = async () => {
        setError("");
        setCreated("");

        if (price === "" || capasity === "" || minutes === "" || name === "" || additional === "") {
            setError("Заповніть всі поля");
            return;
        }

        if (Number(price) > 10000 || Number(price) < 1) {
            setError("Не правильна ціна");
            return;
        }

        try {
            await postTarifs(
                name,
                Number(capasity),
                Number(minutes),
                additional,
                Number(price)
            );

            setCreated("Created");

            // 🔥 ONLY ADD
            onSuccess?.();

        } catch (error: any) {
            console.log("Error API:", error);
            setError(error.message);
        }
    }

    return (
        <div className={styles.drawerMain}>

            <h3>Створити тариф</h3>

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

            <IconButton
                onClick={() => setOpen(false)}
                sx={{ position: "absolute", top: 50, right: 10, color: "white" }}
            >
                <Close />
            </IconButton>

            <div style={{ width: "80%", display: "flex", gap: "10px", paddingTop: "50px" }}>

                <Button
                    sx={{ backgroundColor: "#9ACFB1", flex: 1, p: 2, color: "white" }}
                    onClick={sendUser}
                >
                    Підтвердити
                </Button>

                <Button
                    sx={{ backgroundColor: "#c86426", flex: 1, p: 2, color: "white" }}
                    onClick={() => {
                        setName("");
                        setAdditional("");
                        setCapacity("");
                        setMinutes("");
                        setPrice("");
                    }}
                >
                    Очистити
                </Button>

            </div>

            {error && <Box sx={{ color: "white" }}>{error}</Box>}
            {created && <Box sx={{ color: "#9ACFB1" }}>{created}</Box>}

        </div>
    );
}