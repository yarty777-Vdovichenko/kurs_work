import { Close } from "@mui/icons-material";
import { Box, Button, Drawer, FormControl, IconButton, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";

type Tarif ={
    id:string,
    name:string,
    internet_capacity:number,
    minutes:number,
    additional:string,
    price:number
}


type RightDrawertarifProps = {
    open: boolean;
    setOpen: (value: boolean) => void;
    setData: (users: Tarif[] | ((prev: Tarif[]) => Tarif[])) => void;
};

export default function RightDrawerTarif({
    open,
    setOpen,
    setData
}: RightDrawertarifProps) {
    
    const [internet_capacity,setInternet_capacity]=useState("");
    const [minutes,setMinutes]=useState("");
    const [additional,setAdditional]=useState("");
    const [name,setName]=useState("");
    const [price,setPrice]=useState("");
    function clear()
    {
        setMinutes("");setName("");setAdditional("");setInternet_capacity("");setPrice("");
    }
    function createTarif()
    {
        if (name.trim().length < 2) {alert("Імʼя має мати мінімум 2 символи");return;}
    
        if (Number(minutes) <=0) {alert("Невірна кількість хвилин");return;}
    
        if (additional.trim().length<2) {alert("Невірні додаткові можливості");return;}
        
        if(Number(internet_capacity) <=0) {alert("Невірна кількість гб");return;}

        if(Number(price)<=0){alert("Невірна ціна");return;}
    
        const newTarif = {id: Date.now().toString(), name, internet_capacity:Number(internet_capacity), minutes:Number(minutes) ,additional,price:Number(price)}
        setData(prev => [...prev, newTarif]);
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
                    gap:2
                    }}>
                    <Typography variant="h4" sx={{color:"white",fontWeight:"600"}}>Додати користувача</Typography>
                    <Box sx={{display:"flex",flexDirection:"column"}}>
                    <Typography variant="body1" sx={{color:"white"}}>Назва</Typography>
                    <TextField placeholder="Назва" sx={{backgroundColor:"white",borderRadius:1}} value={name} onChange={(e)=>{setName(e.target.value)}}/>
                    </Box>
                    <Box sx={{display:"flex",flexDirection:"column"}}>
                    <Typography variant="body1" sx={{color:"white"}}>Обсяг інтернету</Typography>
                    <TextField type="number" placeholder="Обсяг інтернету" sx={{backgroundColor:"white",borderRadius:1}} value={internet_capacity} onChange={(e)=>{setInternet_capacity(e.target.value)}}/>
                    </Box>
                    <Box sx={{display:"flex",flexDirection:"column"}}>
                    <Typography variant="body1" sx={{color:"white"}}>Абонплата</Typography>
                    <TextField type="number" placeholder="Абонплата" sx={{backgroundColor:"white",borderRadius:1}} value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
                    </Box>
                    <Box sx={{display:"flex",flexDirection:"column"}}>
                    <Typography variant="body1" sx={{color:"white"}}>Хвилини</Typography>
                    <TextField type="number" placeholder="Хвилини" sx={{backgroundColor:"white",borderRadius:1}} value={minutes} onChange={(e)=>{setMinutes(e.target.value)}}/>
                    </Box>
                    <Box sx={{display:"flex",flexDirection:"column"}}>
                    <Typography variant="body1" sx={{color:"white"}}>Додатково</Typography>
                    <TextField placeholder="Додатково" sx={{backgroundColor:"white",borderRadius:1}} value={additional} onChange={(e)=>{setAdditional(e.target.value)}}/>
                    </Box>
                    <Box sx={{display:"flex",gap:2,width:"100%",mt:"auto"}}>
                        <Button sx={{backgroundColor:"#0B2E1C",justifySelf:"end",color:"white",flex:0.5,borderRadius:"20px"}} onClick={()=>createTarif()}>
                            Додати новий тариф
                        </Button>
                        <Button sx={{backgroundColor:"#0B2E1C",justifySelf:"end",color:"white",flex:0.5,borderRadius:"20px"}} onClick={()=>{clear(); setOpen(false)}}>
                            Скасувати
                        </Button>
                    </Box>
                </Box>
            </Drawer>    
    )
}