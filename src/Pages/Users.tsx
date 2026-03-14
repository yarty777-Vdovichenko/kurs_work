import { Box, Button, colors, IconButton,TextField, } from "@mui/material";
import { useEffect, useState } from "react";
import UserDrawer from "../Components/UserDrawer.tsx";
import "../styles/Base.css"
import { deleteUser, getUsers } from "../api/api.ts";
import { Clear, CopyAll, Delete } from "@mui/icons-material";

const selected={backgroundColor:"#52b57d"}
export default function Users()
{
    const [open,setOpen]=useState<boolean>(false);
    const [selectedUsers,setSelectedUsers]=useState<string[]>([])
    const [users,setUsers]=useState([
        {id:"1",name:"yarty",email:"yaroslav0908l@gmail.com",role:"User"},
        {id:"2",name:"yarty",email:"yaroslav0908l@gmail.com",role:"User"},
        {id:"3",name:"yarty",email:"yaroslav0908l@gmail.com",role:"User"},
        {id:"4",name:"yarty",email:"yaroslav0908l@gmail.com",role:"User"},
        {id:"5",name:"yarty",email:"yaroslav0908l@gmail.com",role:"User"},
        {id:"6",name:"yarty",email:"yaroslav0908l@gmail.com",role:"User"},
        {id:"7",name:"yarty",email:"yaroslav0908l@gmail.com",role:"User"},
        {id:"8",name:"yarty",email:"yaroslav0908l@gmail.com",role:"User"},
        {id:"9",name:"yarty",email:"yaroslav0908l@gmail.com",role:"User"},
        {id:"10",name:"yarty",email:"yaroslav0908l@gmail.com",role:"User"},
    ])

    useEffect(()=>{
        async function loadUser(){
            try{
                const responce = await getUsers();

                setUsers(responce);
            }catch(error)
            {
                console.log(error);
            }
        }
        
        loadUser();
    },[])

    function changeSelect(id:string){
        setSelectedUsers(prev=> prev.includes(id) ? prev.filter(u=>u!==id) : [...prev,id])
    }

    async function deleteSelected(){
        try{
            await Promise.all(selectedUsers.map(id=>deleteUser(id)))
            setUsers(prev => prev.filter(user=> !selectedUsers.includes(user.id)))
            setSelectedUsers([]);
        }
        catch(error){
            console.log(error)
        }
    }

    return(
        <div className="mainUser">
            <div className="search" id="search">
                <TextField placeholder="Пошук..." sx={{backgroundColor:"white", borderColor:"#9ACFB1",flex:1,borderRadius:1}}></TextField>
                <IconButton>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" 
                    d="M9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l5.6 
                    5.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-5.6-5.6q-.75.6-1.725.95T9.5 16m0-2q1.875 0 3.188-1.312T14 
                    9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"/></svg>
                 </IconButton>
                 <IconButton>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" 
                    d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 
                    8.4l3.6 3.6L7 15.6zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 
                    12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 
                    12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 
                    12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"/></svg>
                 </IconButton>
            </div>
            {selectedUsers.length === 0 && 
            <div className="simple">
                <p>Центр управління користувачами: всі, хто підключений до нашого сервісу, в одному місці</p>
            </div>}
            {selectedUsers.length > 0 && 
            <div className="menu">
                <p>Вибрано користувачів: {selectedUsers.length}</p>
                <div>
                    <IconButton onClick={()=>deleteSelected()}><Delete sx={{fontSize:"32px",color:"white"}}/></IconButton>
                    <IconButton onClick={()=>{}}><CopyAll sx={{fontSize:"32px",color:"white"}}/></IconButton>
                    <IconButton onClick={()=>setSelectedUsers([])}><Clear sx={{fontSize:"32px",color:"white"}}/></IconButton>
                </div>
            </div>
            }
            <div className="cardsUser">
                {users.map(user=>{
                    return(
                        <div key={user.id} className={selectedUsers.includes(user.id)? "cardUser selected": "cardUser"} onClick={()=>changeSelect(user.id)}>
                            <div className="dataUser">
                                <span>ID: {user.id}</span>
                                <span className="roleUser">Role: {user.role}</span>
                                <span>Name: {user.name}</span> 
                                <span>Email: {user.email}</span>
                            </div>
                            <div className="selectionUser" style={selectedUsers.includes(user.id)?selected:{}}> </div>
                        </div>
                    )
                })}
            </div>
            <div className="iconsUsers">
                <IconButton
                onClick={()=>window.scrollTo({ top: 0, behavior: "smooth" })}
                sx={{
                    backgroundColor:"#2a9f5d",
                    color:"white",
                    transition:"0.3s",

                    "&:hover":{backgroundColor:"#26382e",color:"white"}
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" 
                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 6l4-4l4 4m-4-4v20"/></svg>
                </IconButton>
                <IconButton 
                onClick={()=>setOpen(true)}
                sx={{
                    backgroundColor:"#2a9f5d",
                    color:"white",
                    transition:"0.3s",

                    "&:hover":{backgroundColor:"#26382e",color:"white"}
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" 
                    d="M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2"/></svg>
                </IconButton>
            </div>
            {open&&(
            <div className={open ? "drawer open" : "drawer"}>
                <UserDrawer setOpen={setOpen}/>
            </div>
            )}
        </div>
    )
}