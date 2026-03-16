import { Button, IconButton, MenuItem, Select, TextField } from "@mui/material"
import "../styles/Base.css"
import { Close } from "@mui/icons-material"
import { useState } from "react"
import { postUser } from "../api/api";

export default function Drawer({setOpen}:{setOpen:(value:boolean)=>void}){
    const [email,setEmail]=useState<string>("");
    const [name,setName]=useState<string>("");
    const [role,setRole]=useState<string>("");
    const [message,setMessage]=useState<string>("");

    const  sendUser = async () => {
        setMessage("");
        try{
            const responce = await postUser(name,email,role);

            if(responce){
                setMessage("Created")
            }
        }   
        catch(eror: any) {
            console.error("Помилка створення користувача:", eror);
            
            let errorMessage = "Невідома помилка";
            
            if (eror.response) {
                console.log("Статус помилки:", eror.response.status);
                console.log("Дані помилки:", eror.response.data);
                
                if (typeof eror.response.data === 'string') {
                    errorMessage = eror.response.data;
                } else if (eror.response.data?.message) {
                    errorMessage = eror.response.data.message;
                } else if (eror.response.data?.title) {
                    errorMessage = eror.response.data.title;
                } else if (eror.response.status === 400) {
                    errorMessage = "Помилка валідації даних";
                } else if (eror.response.status === 401) {
                    errorMessage = "Не авторизовано";
                } else if (eror.response.status === 403) {
                    errorMessage = "Доступ заборонено";
                } else if (eror.response.status === 500) {
                    errorMessage = "Внутрішня помилка сервера";
                }
            } else if (eror.request) {
                errorMessage = "Сервер не відповідає";
            } else {
                errorMessage = "Помилка при створенні запиту";
            }
            
            setMessage(errorMessage);
        }
    }
    return(
        <div className="drawerMain">
            <h3>Створити користувача</h3>
            <TextField value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="email" sx={{backgroundColor:"white",width:"80%",borderRadius:1}}>

            </TextField>
            <TextField value={name} onChange={(e)=>{setName(e.target.value)}}  placeholder="name" sx={{backgroundColor:"white",width:"80%",borderRadius:1}}>

            </TextField>
            <Select sx={{backgroundColor:"white",width:"80%",borderRadius:1}}
                value={role}
                onChange={(e)=>setRole(e.target.value)}>
                <MenuItem value="Meneger">Meneger</MenuItem>
                <MenuItem value="Operator">Operator</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
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
                    backgroundColor:"#9ACFB1",flex:1,p:2,color:"white"
                }} onClick={()=>sendUser()}>Підтвердити</Button>
                <Button sx={{
                    backgroundColor:"#c86426",flex:1,p:2,color:"white"
                }} onClick={()=>{setEmail("");setMessage("");setRole("");}}>Очистити</Button>
            </div>
            {message && <p>{message}</p>}
        </div>
    )
}