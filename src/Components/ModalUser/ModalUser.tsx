import { Button, MenuItem, Select } from "@mui/material"
import styles from "./ModalUser.module.css"
import  { type Role,type ModalUserProps } from "../../types/types"
import { useState } from "react"
import { patchUser } from "../../api/users.api";


export default function ModalUser({role,id,setOpen}:ModalUserProps){
    const [newRole,setNewRole]=useState<Role>(role);

    async function PatchUserHelper(){
        if(newRole===role)
        {
            alert("Ви не змінили роль!");
            return;
        }
        try{
            await patchUser(id,{role:newRole});

            setOpen(false);
        }
        catch(error){
            alert(error);
        }
    }

    return (
    <div className={styles.all}>
        <div className={styles.modal}>
            <Select sx={{backgroundColor:"white",width:"80%",borderRadius:1}}
                value={newRole}
                onChange={(e)=>setNewRole(e.target.value)}>
                <MenuItem value="Manager">Meneger</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="User">User</MenuItem>
            </Select>
            <div className={styles.buttons}>
                <Button sx={{backgroundColor:"#9ACFB1",color:"white"}} onClick={()=>{PatchUserHelper()}}>Зберегти</Button>
                <Button sx={{backgroundColor:"#ec813f",color:"white"}} onClick={()=>{setOpen(false)}}>Скасувати</Button>
            </div>
        </div>  
    </div>
    )
}