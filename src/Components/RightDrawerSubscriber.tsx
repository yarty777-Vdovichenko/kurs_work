import { CheckBox, Close } from "@mui/icons-material";
import { Box, Button, Checkbox, Drawer, FormControl, IconButton, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";

type Tarif ={
    id:string,
    name:string,
    internet_capacity:number,
    minutes:number,
    additional:string,
    price:number
}

type SimStatus="ACTIVE"|"BLOCKED"

type SimCard ={
  id: string;
  simNumber: string;
  status: SimStatus;
  createdAt: string;
  tarif: Tarif;
}

type Subscriber ={
  id: string;
  fullName: string;
  createdAt: string;
  sims: SimCard[];
}
type RightDrawerProps = {
    open: boolean;
    setOpen: (value: boolean) => void;
    setData: (users: Subscriber[] | ((prev: Subscriber[]) => Subscriber[])) => void;
    dataTarif: Tarif[];
};

export default function RightDrawer({
    open,
    setOpen,
    setData,
    dataTarif
}: RightDrawerProps) {
    
    const [simNumber,setSimNumber]=useState("");
    const [status,setStatus]=useState<SimStatus>("ACTIVE");
    const [tarif,setTarif]=useState("");
    const [addSim,setAddSim]=useState(false)
    const [fullName,setFullName]=useState("");
    function clear()
    {
        setSimNumber("");setFullName("");
    }
    function createUser()
    {
        if (fullName.trim().length < 2) {
            alert("Імʼя має мати мінімум 2 символи");
            return;
        }

        if (addSim&&simNumber.trim().length!==12) {
            alert("Невірний розмір телефону");
            return;
        }

        const tariff= dataTarif.find((dat)=>dat.id===tarif)

        if (addSim && !tariff) {
        alert("Оберіть тариф");
        return;
        }

        const newSubscriber:Subscriber = {id: Date.now().toString(), fullName, createdAt:new Date().toISOString(),sims:addSim ? [{id: Date.now().toString(),simNumber,status,createdAt:new Date().toISOString(),tarif:tariff!}]:[]  }
        setData(prev => [...prev, newSubscriber]);
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
                    gap:0.5
                    }}>
                    <Typography variant="h4" sx={{color:"white",fontWeight:"600"}}>Додати користувача</Typography>
                    <TextField placeholder="ПІБ" sx={{backgroundColor:"white",borderRadius:1}} value={fullName} onChange={(e)=>{setFullName(e.target.value)}}>
                    </TextField>
                    <Box
                    sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }}
                    onClick={() => setAddSim(prev => !prev)}
                    >
                        <Typography sx={{ color: "white" }}>
                            Створити користувача з сімкою?
                        </Typography>
                        <Checkbox checked={addSim} sx={{color:"white"}}/>
                    </Box>                    
                        {addSim && <>
                        <Typography variant="body1" sx={{color:"white"}}>Номер сімки:</Typography>
                        <TextField placeholder="380XXXXXXXXX" sx={{backgroundColor:"white",borderRadius:1}} value={simNumber} onChange={(e)=>{setSimNumber(e.target.value)}}>
                        </TextField>
                        <Typography variant="body1" sx={{color:"white"}}>Тариф:</Typography>
                        <FormControl fullWidth sx={{ backgroundColor: "white", borderRadius: 1 }}>
                            <Select
                                value={tarif}
                                label="Тариф"
                                onChange={(e) => setTarif(e.target.value)}
                                sx={{ backgroundColor: "white", borderRadius: 1 ,p:1.5}}
                                variant="standard"
                            >
                                {dataTarif.map((tarif)=>(<MenuItem key={tarif.id} value={tarif.id}>{tarif.name}</MenuItem>))}
                            </Select>
                        </FormControl>
                        <Typography variant="body1" sx={{color:"white"}}>Додатково</Typography>
                        <FormControl fullWidth sx={{ backgroundColor: "white", borderRadius: 1 }}>
                            <Select
                                value={status}
                                label="Тариф"
                                onChange={(e) => setStatus(e.target.value)}
                                sx={{ backgroundColor: "white", borderRadius: 1 ,p:1.5}}
                                variant="standard"
                            >
                                <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                                <MenuItem value="BLOCKED">BLOCKED</MenuItem>
                            </Select>
                        </FormControl>
                    </>
                    }
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