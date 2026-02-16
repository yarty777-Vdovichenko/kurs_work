import { Close } from "@mui/icons-material";
import { Box, Button, Drawer, FormControl, IconButton, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";

type User = {
    id: string;
    name: string;
    email: string;
    role: string;
};

type RightDrawerProps = {
    open: boolean;
    setOpen: (value: boolean) => void;
    setData: React.Dispatch<React.SetStateAction<User[]>>;
};

export default function RightDrawer({
    open,
    setOpen,
    setData
}: RightDrawerProps) {
    
    const [email,setEmail]=useState("");
    const [role,setRole]=useState("");
    const [name,setName]=useState("");
    function clear()
    {
        setEmail("");setName("");setRole("");
    }
    function createUser()
    {
        if (name.trim().length < 2) {
            alert("Імʼя має мати мінімум 2 символи");
            return;
        }
    
        if (email.trim().length <2 || !email.includes("@")) {
            alert("Невірний email");
            return;
        }
    
        if (!role) {
            alert("Оберіть роль");
            return;
        }
    
        const newUser = {id: Date.now().toString(), name, email, role }
        setData(prev => {
        const updated = [...prev, newUser];
        return updated;
        });
    clear();
    }
    return (
            <Drawer variant="persistent" open={open} anchor="right" sx={{
                
                
                '& .MuiDrawer-paper':{
                    transition:"width 0.3s",
                    width:open ? "33%" : 0,
                    backgroundColor:"#0B2E1C",
                    zIndex:0,
                    mt:"50px",
                    pr:1,
                    py:2,
                    pl:2
                }
            }}>
                <IconButton onClick={()=>{setOpen(false)}} sx={{
                    position:"absolute",
                    top:12,
                    right:12,
                    color:"#479b6a",
                }}>
                    <Close/>
                </IconButton>
                <Box sx={{
                    display:"flex",
                    flexDirection:"column",
                    backgroundColor:"#1F4F34",
                    borderRadius:"20px",
                    height:"calc(100% - 50px)",
                    justifyContent:"center",
                    alignContent:"center",
                    p:6,
                    gap:6
                    }}>
                    <Typography variant="h4" sx={{color:"white",fontWeight:"600"}}>Додати користувача</Typography>
                    <TextField placeholder="Ім'я" sx={{backgroundColor:"white",borderRadius:1}} value={name} onChange={(e)=>{setName(e.target.value)}}>
                    
                    </TextField>
                    
                    <TextField placeholder="Мейл" sx={{backgroundColor:"white",borderRadius:1}} value={email} onChange={(e)=>{setEmail(e.target.value)}}>

                    </TextField>
                    <FormControl fullWidth sx={{ backgroundColor: "white", borderRadius: 1 }}>
                        <Select
                            value={role}
                            label="Роль"
                            onChange={(e) => setRole(e.target.value)}
                            sx={{ backgroundColor: "white", borderRadius: 1 ,p:1.5}}
                            variant="standard"
                        >
                            <MenuItem value="Admin">Адміністратор</MenuItem>
                            <MenuItem value="Operator">Оператор</MenuItem>
                            <MenuItem value="Manager">Менеджер</MenuItem>
                        </Select>
                    </FormControl>
                    <Box sx={{display:"flex",gap:2,width:"100%",mt:"auto"}}>
                        <Button sx={{backgroundColor:"#0B2E1C",justifySelf:"end",color:"white",flex:0.5,borderRadius:"20px"}} onClick={()=>createUser()}>
                            Відправити мeйл(поки просто додає)
                        </Button>
                        <Button sx={{backgroundColor:"#0B2E1C",justifySelf:"end",color:"white",flex:0.5,borderRadius:"20px"}} onClick={()=>{clear(); setOpen(false)}}>
                            Скасувати
                        </Button>
                    </Box>
                </Box>
            </Drawer>    
    )
}