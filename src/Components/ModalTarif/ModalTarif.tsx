import { Button, TextField, Typography } from "@mui/material"
import styles from "./ModalTarif.module.css"
import { type ModalTarifProps } from "../../types/types"
import { useState } from "react"
import { putTarifs } from "../../api/tarifs.api";

export default function ModalTarif({ tarif, setOpen }: ModalTarifProps) {
    const [name, setName] = useState(tarif!.name);
    const [capacity, setCapacity] = useState(tarif!.internet_capacity);
    const [minutes, setMinutes] = useState(tarif!.minutes);
    const [price, setPrice] = useState(tarif!.price);
    const [additional, setAdditional] = useState(tarif!.additional);

    async function saveTarif() {
        if (
            name === tarif!.name &&
            capacity === tarif!.internet_capacity &&
            minutes === tarif!.minutes &&
            price === tarif!.price &&
            additional === tarif!.additional
        ) {
            alert("Ви нічого не змінили!");
            return;
        }
        try {
            await putTarifs(tarif!.id, { 
                id: tarif!.id, 
                name: name, 
                internet_capacity: capacity, 
                minutes: minutes, 
                price: price, 
                additional: additional 
            });
            setOpen(false);
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className={styles.all}>
            <div className={styles.modal}>
                <Typography variant="h6" sx={{color:"white"}}>Редагування тарифу</Typography>

                <TextField sx={{backgroundColor:"white",width:"80%",borderRadius:1}}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField sx={{backgroundColor:"white",width:"80%",borderRadius:1}}
                    type="number"
                    value={capacity}
                    onChange={(e) => setCapacity(Number(e.target.value))}
                />
                <TextField sx={{backgroundColor:"white",width:"80%",borderRadius:1}}
                    type="number"
                    value={minutes}
                    onChange={(e) => setMinutes(Number(e.target.value))}
                />
                <TextField sx={{backgroundColor:"white",width:"80%",borderRadius:1}}
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                />
                <TextField sx={{backgroundColor:"white",width:"80%",borderRadius:1}}
                    value={additional}
                    onChange={(e) => setAdditional(e.target.value)}
                />

                <div className={styles.buttons}>
                    <Button sx={{ backgroundColor: "#9ACFB1", color: "white" }} onClick={saveTarif}>
                        Зберегти
                    </Button>
                    <Button sx={{ backgroundColor: "#ec813f", color: "white" }} onClick={() => setOpen(false)}>
                        Скасувати
                    </Button>
                </div>
            </div>
        </div>
    );
}