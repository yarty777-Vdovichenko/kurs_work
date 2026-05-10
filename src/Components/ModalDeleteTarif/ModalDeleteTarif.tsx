import { Button, MenuItem, Select } from "@mui/material"
import styles from "./ModalDeleteTarif.module.css"
import  { type ModalDelteTarif, type Tarif } from "../../types/types"
import { useEffect, useState } from "react"
import { deleteTarifs, getTarifs } from "../../api/tarifs.api";


export default function ModalDeleteTarif({id,setOpen,onSuccess}:ModalDelteTarif){
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

    async function handleReplaceTarif(){
        if(tarifId===""){
            alert("Виберіть тариф")
            return;
        }
        try{
            await deleteTarifs(id,tarifId);
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
            <p>Тариф на який ви хочете замінити</p>
            <Select  sx={{backgroundColor:"white",width:"80%",borderRadius:1}} value={tarifId ?? ""} onChange={(e) => setTarifId(e.target.value)}>
                {tarifs?.filter(tarif=>tarif.id!==id)
                    .map(tarif=><MenuItem key={tarif.id} value={tarif.id}>{tarif.name}</MenuItem>)}
            </Select>
                <div className={styles.buttons}>
                <Button sx={{backgroundColor:"#9ACFB1",color:"white"}} onClick={()=>{handleReplaceTarif()}}>Зберегти</Button>
                <Button sx={{backgroundColor:"#ec813f",color:"white"}} onClick={()=>{setOpen(false)}}>Скасувати</Button>
            </div>
        </div>  
    </div>
    )
}