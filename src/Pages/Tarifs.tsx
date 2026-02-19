import { Cancel, Delete, Search } from "@mui/icons-material";
import { Box, Button, IconButton,TextField, } from "@mui/material";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import RightDrawer from "../Components/RightDrawerTarif";

/*
назва
абонплата
обсяг інтернету
хвилини / SMS
дод можливості
 */


export default function Tarifs()
{
    const [searchText,setSearchText]=useState('');
    const [open,setOpen]=useState(false);

    const [data,setData]=useState([ 
        { id: "1", name: "OK", internet_capacity: 20, minutes: 3000,additional:"Безкоштовні дзвінки за кордон",price:450},
        { id: "2", name: "SUPER", internet_capacity: 30, minutes: 6000,additional:"Безкоштовні дзвінки за кордон",price:250},
    ])  
    
    useEffect(()=>{setfilteredRows([...data])},[data])

    const [filteredRows,setfilteredRows]=useState([...data]);

    const columns=[
        {field: "name", headerName: "Імʼя",flex: 1},
        {field: "internet_capacity", headerName: "Обсяг інтернету (гігабайти)",flex: 1 },
        {field: "minutes", headerName: "Хвилини",flex: 1},
        {field: "additional", headerName: "Додаткове",flex: 1},
        {field: "actions",headerName: "",renderCell: (params:any) => <Delete  onClick={()=>deleteById(params.id)} sx={{"&:hover":{cursor:"pointer"}}} ></Delete>,width:50,sortable:false,filterable:false}
] 
function deleteById(id:string)
{
    const deletee= data.filter(dat => dat.id !== id)
    setData(deletee);
    setfilteredRows(deletee);
}
function lookForData()
{
    const newFilteredRows = data.filter((row)=>
    row.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setfilteredRows(newFilteredRows);
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
                <TextField value={searchText} onChange={(e) => setSearchText(e.target.value)} sx=
                {{
                    display:"flex",
                    alignContent:"space-between",
                    borderRadius:1,
                    backgroundColor:"white",
                }}
                placeholder="Пошук (за іменем)" InputProps={{endAdornment:<Box sx={{display:"flex",flexDirection:"row"}}><IconButton onClick={lookForData}><Search/></IconButton><IconButton onClick={()=>{setSearchText("");setfilteredRows([...data])}}><Cancel/></IconButton></Box>}}>
                </TextField>    
                <Box  sx={{flex:1,backgroundColor:"#1F4F34",borderRadius:"20px",p:1}}>
                    <DataGrid
                    rows={filteredRows}
                    columns={columns}
                    sx={{borderRadius:"20px"}}
                    />
                </Box>
                <Button sx=
                {{
                    borderRadius:"20px",
                    backgroundColor:"#3C7B56",
                    color:"white",
                    py:1,
                    "&:hover":{backgroundColor:"#479b6a"}
                }} onClick={()=>{setOpen(true)}}
                >Додати</Button>
            </Box>
            <RightDrawer open={open} setOpen={setOpen} setData={setData}/>
        </Box>
    )
}