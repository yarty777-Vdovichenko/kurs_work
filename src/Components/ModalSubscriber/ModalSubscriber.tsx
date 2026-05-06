import { Button, TextField } from "@mui/material"
import styles from "./ModalSubscriber.module.css"
import  { type ModalSubProps, type Sub  } from "../../types/types"
import { useState } from "react"
import { putSub } from "../../api/subscriber.api";


export default function ModalUser({sub,setOpen,onSuccess}:ModalSubProps){
    const [name,setName]=useState<string>(sub.fullName);

    async function PatchUserHelper(){
        if(sub.fullName===name)
        {
            alert("Ви не змінили імені!");
            return;
        }
        const updated = { ...sub, fullName: name };
        try{
            await putSub(sub.id,updated);
            onSuccess?.();
            setOpen(false);
        }
        catch(error){
            alert(error);
        }
    }

    return (
    <div className={styles.all}>
        <div className={styles.modal}>
            <TextField 
            sx={{backgroundColor:"white",borderRadius:1}} 
            value={name} 
            onChange={(e)=>{setName(e.target.value)}}></TextField>
            <div className={styles.buttons}>
                <Button sx={{backgroundColor:"#9ACFB1",color:"white"}} onClick={()=>{PatchUserHelper()}}>Зберегти</Button>
                <Button sx={{backgroundColor:"#ec813f",color:"white"}} onClick={()=>{setOpen(false)}}>Скасувати</Button>
            </div>
        </div>  
    </div>
    )
}