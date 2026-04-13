import { Box, Button, IconButton, MenuItem, Select, TextField } from "@mui/material"
import styles from "./UserDrawer.module.css";
import { Close } from "@mui/icons-material"
import { useState } from "react"
import { postUser } from "../../api/api";
import type { Role } from "../../types/types";

export default function Drawer({setOpen}:{setOpen:(value:boolean)=>void}){
    const [email,setEmail]=useState<string>("");
    const [name,setName]=useState<string>("");
    const [role,setRole]=useState<Role>("");
    const [error,setError]=useState<string>("");
    const [created,setCreated]=useState<string>("");

    const sendUser = async () => {
        setError("");
        setCreated("");

        try {
            await postUser(name, email, role);
            setCreated("Created");
        } catch (error: any) {
            console.log("Error API:", error);
            setError(error.message);
        }
    }

    return(
        <div className={styles.drawerMain}>
            <h3>Створити користувача</h3>
            <TextField value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="email" sx={{backgroundColor:"white",width:"80%",borderRadius:1}}>

            </TextField>
            <TextField value={name} onChange={(e)=>{setName(e.target.value)}}  placeholder="name" sx={{backgroundColor:"white",width:"80%",borderRadius:1}}>

            </TextField>
            <Select sx={{backgroundColor:"white",width:"80%",borderRadius:1}}
                value={role}
                onChange={(e)=>setRole(e.target.value)}>
                <MenuItem value="Meneger">Meneger</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="User">User</MenuItem>
            </Select>
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
                }} onClick={()=>{setEmail("");setName("");setRole("");}}>Очистити</Button>
            </div>
            {error && <Box sx={{color:"white"}}>{error}</Box>}
            {created && <Box sx={{color:"#9ACFB1"}}>{created}</Box>}
        </div>
    )
}