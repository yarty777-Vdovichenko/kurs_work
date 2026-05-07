import { Button, MenuItem, Select } from "@mui/material"
import styles from "./ModalAddSim.module.css"
import  { type ModalAddSimProps, type Tarif } from "../../types/types"
import { useEffect, useState } from "react"
import { addSim } from "../../api/subscriber.api";
import { getTarifs } from "../../api/tarifs.api";


export default function ModalAddSim({subId,setOpen,onSuccess}:ModalAddSimProps){
    const [tarifs,setTarifs]=useState<Tarif[]>()
    const [tarifId,setTarifId]=useState<string>("")

    async function loadTarifs(){
        try{
            const response = await getTarifs();
            setTarifs(response)
        }
        catch(error:any)
        {
            console.log(error);
        }
    }

    useEffect(()=>{
        loadTarifs()
    },[])

    async function PatchUserHelper(){
        if(tarifId===""){
            alert("Виберіть тариф")
            return;
        }
        try{
            await addSim({subId,tarifId});
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
            <Select  sx={{backgroundColor:"white",width:"80%",borderRadius:1}} value={tarifId ?? ""} onChange={(e) => setTarifId(e.target.value)}>
                {tarifs?.map(tarif=><MenuItem key={tarif.id} value={tarif.id}>{tarif.name}</MenuItem>)}
            </Select>
                <div className={styles.buttons}>
                <Button sx={{backgroundColor:"#9ACFB1",color:"white"}} onClick={()=>{PatchUserHelper()}}>Зберегти</Button>
                <Button sx={{backgroundColor:"#ec813f",color:"white"}} onClick={()=>{setOpen(false)}}>Скасувати</Button>
            </div>
        </div>  
    </div>
    )
}