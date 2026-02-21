import { Cancel, Close, Delete, Search, SimCard } from "@mui/icons-material";
import { Box, Button, IconButton,TextField, } from "@mui/material";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import RightDrawerSubscriber from "../Components/RightDrawerSubscriber";

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

export default function Abonents()
{
    const [searchText,setSearchText]=useState('');
    const [open,setOpen]=useState(false);
    const [openSims,setOpenSims]=useState(false);
    const [dataTarif,setDataTarif]=useState<Tarif[]>([ 
        { id: "1", name: "OK", internet_capacity: 20, minutes: 3000,additional:"Безкоштовні дзвінки за кордон",price:450},
        { id: "2", name: "SUPER", internet_capacity: 30, minutes: 6000,additional:"Безкоштовні дзвінки за кордон",price:250},
    ])  
    const [dataSubscriber,setDataSubscriber]=useState<Subscriber[]>([ 
        { id: "1", fullName: "Абонент Абонент Абонент", createdAt: new Date().toISOString(),sims:[{id:"1",simNumber:"3800000000",status:"ACTIVE",createdAt:new Date().toISOString(),tarif:dataTarif[0]}]},
        { id: "2", fullName: "Абонент Абонент Абонент", createdAt: new Date().toISOString(),sims:[{id:"2",simNumber:"3800000000",status:"ACTIVE",createdAt:new Date().toISOString(),tarif:dataTarif[0]}]},
    ])
    const columnsSubscriber=[
        {field: "fullName", headerName: "Імʼя",flex: 1},
        { 
        field: "createdAt", 
        headerName: "Дата створення", 
        flex: 1,
        renderCell: (params: any) => (
        <span>{new Date(params.value).toLocaleDateString('uk-UA', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })}</span>
        )},
        {field: "viewSims",headerName: "",renderCell: (params:any) => 
            <SimCard  onClick={()=>{setSelectedSis(params.row.sims);setOpenSims(true);}} sx={{"&:hover":{cursor:"pointer"}}} >
            </SimCard>,width:50,sortable:false,filterable:false},
        {field: "delete",headerName: "",renderCell: (params:any) => 
            <Delete  onClick={()=>deleteByIdSubscriber(params.id)} sx={{"&:hover":{cursor:"pointer"}}} >
            </Delete>,width:50,sortable:false,filterable:false},     
    ] 
    const columnsSis=[
        {field:"simNumber",headerName:"Номер сімки",flex:1},
        {field:"status",headerName:"Статус",flex:1},
        {field:"createdAt",headerName:"Дата створення",flex:1,
        renderCell: (params: any) => (
        <span>{new Date(params.value).toLocaleDateString('uk-UA', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })}</span>
        )},
        {field:"tarif",headerName:"Тариф",flex:1,
        renderCell: (params: any) => (
        <span>
            {params.row.tarif?.name}
        </span>
        )},
    ]
    const [selectedSis,setSelectedSis]=useState<SimCard[]>([]);
    useEffect(()=>{setfilteredRowsSubscriber([...dataSubscriber])},[dataSubscriber])

    const [filteredRowsSubscriber,setfilteredRowsSubscriber]=useState([...dataSubscriber]);

    
function deleteByIdSubscriber(id:string)
{
    const deletee= dataSubscriber.filter(dat => dat.id !== id)
    setDataSubscriber(deletee);
    setfilteredRowsSubscriber(deletee);
}

function lookForData() {
    const newFilteredRows = dataSubscriber.filter(
        (row) => 
            row.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
            row.sims.some((sim) => 
                sim.simNumber.toLowerCase().includes(searchText.toLowerCase())
            )
    );
    setfilteredRowsSubscriber(newFilteredRows);
}


    return(
        <Box sx={{
            backgroundColor:"#0B2E1C",
            display:"flex",
            flexDirection:"row",
            flex:1,
            minHeight:"calc(100vh - 50px)",
            width: "100%",
            pl:2,
            gap:2,
            pr: open ? "33%" : "0%",
            
        }}>
            <Box sx={{flex:1 ,display:"flex",flexDirection:"column",py:2,pr:open ? 2 : 0,gap:2, width: "100%",}}>
                <Box sx={{display:"flex"}}>
                <TextField value={searchText} onChange={(e) => setSearchText(e.target.value)} sx=
                {{
                    flex:1,
                    display:"flex",
                    alignContent:"space-between",
                    borderRadius:1,
                    backgroundColor:"white",
                    mr:2,
                }}
                placeholder="Пошук (за іменем/за номером)" InputProps={{
                    endAdornment:
                    <Box sx={{display:"flex",flexDirection:"row"}}>
                        <IconButton onClick={lookForData}>
                            <Search/>
                        </IconButton>
                        <IconButton onClick={()=>{setSearchText("");setfilteredRowsSubscriber([...dataSubscriber])}}>
                            <Cancel/>
                        </IconButton>
                    </Box>}}/>
                </Box>
                <Box  sx={{flex:1,backgroundColor:"#1F4F34",borderRadius:"20px",p:1,mr:2,display:"flex"   }}>
                    <DataGrid
                    rows={filteredRowsSubscriber}
                    columns={columnsSubscriber}
                    sx={{borderRadius:"20px"}}
                    />
                    {openSims &&<>
                        <DataGrid
                        rows={selectedSis}
                        columns={columnsSis}
                        sx={{borderRadius:"20px",ml:2}}
                        />
                        <IconButton onClick={()=>setOpenSims(false)} sx={{position:"absolute",top:"140px",right:20,backgroundColor:"#ec813f",color:"white",width:"20px",height:"20px","&:hover":{backgroundColor:"#b75d24",color:"white"}}}><Close sx={{width:"20px",height:"20px"}}/></IconButton>
                    </>}
                </Box>
                <Button sx=
                {{
                    borderRadius:"20px",
                    backgroundColor:"#3C7B56",
                    color:"white",
                    py:1,
                    "&:hover":{backgroundColor:"#479b6a"}
                }} onClick={()=>{{setOpen(true)}}}
                >Додати</Button>

                <RightDrawerSubscriber dataTarif={dataTarif} open={open} setOpen={setOpen} setData={setDataSubscriber}></RightDrawerSubscriber>
            </Box>
        </Box>
    )
}