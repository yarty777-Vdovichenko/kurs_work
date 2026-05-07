import { Box, Button, Checkbox, IconButton, MenuItem, Select, TextField } from "@mui/material"
import styles from "./AbonentDrawer.module.css";
import { Close } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { postSub } from "../../api/subscriber.api";
import type { Tarif } from "../../types/types";
import { getTarifs } from "../../api/tarifs.api";

export default function SubscriberDrawer({setOpen,onSuccess}:{setOpen:(value:boolean)=>void,onSuccess?: () => void}){
    const [name,setName]=useState<string>("");
    const [error,setError]=useState<string>("");
    const [created,setCreated]=useState<string>("");
    const [checked, setChecked] = useState(false);
    const [tarifs,setTarifs]=useState<Tarif[]>()
    const [status,setStatus]=useState<"active" | "blocked">("active")
    const [tarifId,setTarifId]=useState<string>()

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

    const sendSubscriber = async () => {
    setError("");
    setCreated("");
    try {
        await postSub({
            fullName: name,
            sims: checked && tarifId ? [{ status , tarifId  }] : []
        });
        setCreated("Created");
        onSuccess?.();  
    } catch(error: any) {
        setError(error.message);
    }
}

    return(
        <div className={styles.drawerMain}>
            <h3>Додати абонента</h3>
            <p>ПІБ</p>
            <TextField value={name} onChange={(e)=>{setName(e.target.value)}}  placeholder="name" sx={{backgroundColor:"white",width:"80%",borderRadius:1}}>
            </TextField>
            <Checkbox sx={{color:"white"}} checked={checked} onChange={(e) => setChecked(e.target.checked)}></Checkbox><p>Створити сімку?    </p>
            {checked && 
            <div className={styles.addSimFields}>
                <Select  sx={{backgroundColor:"white",width:"80%",borderRadius:1}} value={status} onChange={(e) => setStatus(e.target.value as "active" | "blocked")}>
                    <MenuItem value="active">Активний</MenuItem>
                    <MenuItem value="blocked">Заблокований</MenuItem>
                </Select>
                <Select  sx={{backgroundColor:"white",width:"80%",borderRadius:1}} value={tarifId ?? ""} onChange={(e) => setTarifId(e.target.value)}>
                    {tarifs?.map(tarif=><MenuItem key={tarif.id} value={tarif.id}>{tarif.name}</MenuItem>)}
                </Select>
            </div>
            }
            <IconButton 
            onClick={()=>setOpen(false)}
            sx={{
                position:"absolute",
                top:50,
                right:10,
                color:"white"
            }}>
                <Close/>
            </IconButton>
            <div style={{width:"80%",display:"flex",gap:"10px",paddingTop:"50px"}}>            
                <Button sx={{
                    backgroundColor:"#9ACFB1",flex:1,p:2,color:"white",transition:"0.3s",
                    "&:hover":{backgroundColor:"#7aaa8f"}
                }} onClick={()=>sendSubscriber()}>Підтвердити</Button>
                <Button sx={{
                    backgroundColor:"#c86426",flex:1,p:2,color:"white",transition:"0.3s",
                    "&:hover":{backgroundColor:"#9b4e1f"}
                }} onClick={()=>{setName("");}}>Очистити</Button>
            </div>
            {error && <Box sx={{color:"white"}}>{error}</Box>}
            {created && <Box sx={{color:"#9ACFB1"}}>{created}</Box>}
        </div>
    )
}