import { Cancel, Close, Delete, Edit, EditAttributes, Search } from "@mui/icons-material";
import { Box, Button, Drawer, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import RightDrawer from "../Components/RightDrawerUsers";

export default function Users()
{
    const [searchText,setSearchText]=useState('');
    const [open,setOpen]=useState(false);

    const [data,setData]=useState([ 
        { id: "1", name: "Ivan", email: "ivan@mail.com", role: "Admin" },
        { id: "2", name: "Olena", email: "olena@mail.com", role: "Operator" }
    ])  
    const searchData = data.filter((row) =>
    row.name.toLowerCase().includes(searchText.toLowerCase()) ||
    row.email.toLowerCase().includes(searchText.toLowerCase()) ||
    row.role.toLowerCase().includes(searchText.toLowerCase())
);
    const columns=[
        {field: "name", headerName: "Імʼя",flex: 1},
        {field: "email", headerName: "Email",flex: 1 },
        {field: "role", headerName: "Роль",flex: 1},
        {field: "actions",headerName: "",renderCell: (params:any) => <Delete  onClick={()=>deleteById(params.id)} sx={{"&:hover":{cursor:"pointer"}}} ></Delete>,width:50,sortable:false,filterable:false}
]
function deleteById(id:string)
{
    setData(prev => prev.filter(dat => dat.id !== id));
}
function lookForData()
{
    const filteredRows = data.filter((row)=>
    row.name.toLowerCase().includes(searchText.toLowerCase()) ||
    row.email.toLowerCase().includes(searchText.toLowerCase()) ||
    row.role.toLowerCase().includes(searchText.toLowerCase())
    );
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
                placeholder="Пошук..." InputProps={{endAdornment:<Box sx={{display:"flex",flexDirection:"row"}}><IconButton onClick={lookForData}><Search/></IconButton><IconButton onClick={()=>{setSearchText("");}}><Cancel/></IconButton></Box>}}>
                </TextField>    
                <Box  sx={{flex:1,backgroundColor:"#1F4F34",borderRadius:"20px"}}>
                    <DataGrid
                    rows={searchData}
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
            <RightDrawer open={open} setOpen={setOpen} setData={setData}></RightDrawer>
        </Box>
    )
}