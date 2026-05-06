import { Button, MenuItem, Select } from "@mui/material"
import styles from "./ModalEditSim.module.css"
import  { type Sim, type ModalEditSimProps, type Status, type Tarif } from "../../types/types"
import { useEffect, useState } from "react"
import { getSimById,editSim } from "../../api/subscriber.api";
import { getTarifs } from "../../api/tarifs.api";


export default function ModalEditSim({subId,simId,setOpen,onSuccess}:ModalEditSimProps){
    const [tarifs,setTarifs]=useState<Tarif[]>()
    const [tarifId,setTarifId]=useState<string>("1")
    const [status,setStatus]=useState<Status>("active")
    const [sim,setSim]=useState<Sim>()

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

    async function getsimCardById(){
        try{
            const simm = await getSimById({subId,simId});
            setStatus(simm.status);
            setTarifId(simm.tarifId);
            setSim(simm);
        }
        catch(error:any)
        {
            console.log(error);
        }
    }

    useEffect(()=>{
        loadTarifs();
        getsimCardById();
    },[])

    async function PatchUserHelper(){
        if(tarifId===""||tarifId==="1"){
            alert("Не коректний траиф");
            return;
        }
        if(tarifId===sim?.tarifId&&status===sim?.status){
            alert("Ви нічого не змінили")
            return;
        }
        try{
            await editSim({tarifId,status,subId,simId});
            onSuccess?.()
            setOpen(false);
        }
        catch(error){
            alert(error);
        }
    }

    return (
    <div className={styles.all}>
        <div className={styles.modal}>
            <Select 
            sx={{backgroundColor:"white",width:"80%",borderRadius:1}}
            value={status} onChange={(e)=>setStatus(e.target.value)}>
                <MenuItem value={"active"}>Активна</MenuItem>
                <MenuItem value={"blocked"}>Заблокована</MenuItem>
            </Select>
            <Select  sx={{backgroundColor:"white",width:"80%",borderRadius:1}} value={tarifId} onChange={(e) => setTarifId(e.target.value)}>
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