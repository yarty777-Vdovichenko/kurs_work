import { Box, Button, IconButton, TextField } from "@mui/material"
import styles from "./TarifDrawer.module.css";
import { Close } from "@mui/icons-material"
import { useState } from "react"
import { postTarifs } from "../../api/tarifs.api";

export default function TarifDrawer({setOpen}:{setOpen:(value:boolean)=>void}){
    const [name,setName]=useState<string>("");
    const [capasity,setCapacity]=useState<string>("");
    const [minutes,setMinutes]=useState<string>("");
    const [additional,setAdditional]=useState<string>("");
    const [price,setPrice]=useState<string>("");
    const [error,setError]=useState<string>("");
    const [created,setCreated]=useState<string>("");

    const sendUser = async () => {
        setError("");
        setCreated("");
        if(price===""||capasity===""||minutes===""||name===""||additional==="")
        {    
            setError("Заповніть всі поля")
            return;
        }
        try {
            await postTarifs(name, Number(capasity),Number(minutes),additional,Number(price));
            setCreated("Created");
        } catch (error: any) {
            console.log("Error API:", error);
            setError(error.message);
        }
    }

    return(
        <div className={styles.drawerMain}>
            <h3>Створити тариф</h3>
            <p>Назва</p>
            <TextField value={name} onChange={(e)=>{setName(e.target.value)}}  placeholder="name" sx={{backgroundColor:"white",width:"80%",borderRadius:1}}>
            </TextField>
            <p>Кількість інтернету(Гб)</p>
            <TextField type="number" value={capasity} onChange={(e)=>{setCapacity(e.target.value)}} placeholder="capacity" sx={{backgroundColor:"white",width:"80%",borderRadius:1}}>
            </TextField>
            <p>Хвилини</p>
            <TextField type="number" value={minutes} onChange={(e)=>{setMinutes(e.target.value)}} placeholder="minutes" sx={{backgroundColor:"white",width:"80%",borderRadius:1}}>
            </TextField>
            <p>Ціна</p>
            <TextField type="number" value={price} onChange={(e)=>{setPrice(e.target.value)}} placeholder="price" sx={{backgroundColor:"white",width:"80%",borderRadius:1}}>
            </TextField>
            <p>Додаткові можливості</p>
            <TextField value={additional} onChange={(e)=>{setAdditional(e.target.value)}}  placeholder="additional" sx={{backgroundColor:"white",width:"80%",borderRadius:1}}>
            </TextField>
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
                }} onClick={()=>sendUser()}>Підтвердити</Button>
                <Button sx={{
                    backgroundColor:"#c86426",flex:1,p:2,color:"white",transition:"0.3s",
                    "&:hover":{backgroundColor:"#9b4e1f"}
                }} onClick={()=>{setName("");setAdditional("");setCapacity(0);setMinutes(0);setPrice(0);}}>Очистити</Button>
            </div>
            {error && <Box sx={{color:"white"}}>{error}</Box>}
            {created && <Box sx={{color:"#9ACFB1"}}>{created}</Box>}
        </div>
    )
}