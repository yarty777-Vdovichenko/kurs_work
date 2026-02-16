import { Cancel, Close, Edit, EditAttributes, Search } from "@mui/icons-material";
import { Box, Button, Drawer, IconButton, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function Users()
{
    const [searchText,setSearchText]=useState('');
    const [open,setOpen]=useState(false);
    const [data,setData]=useState([ 
        { id: 1, name: "Ivan", email: "ivan@mail.com", role: "Admin" },
        { id: 2, name: "Olena", email: "olena@mail.com", role: "Operator" }
    ])  
    const [searchData,setSearchData]=useState([...data]);
    const columns=[
        {field: "name", headerName: "Імʼя",flex: 1},
        {field: "email", headerName: "Email",flex: 1 },
        {field: "role", headerName: "Роль",flex: 1},
        {field: "actions",headerName: "",renderCell: () => <Edit sx={{"&:hover":{cursor:"pointer"}}}></Edit>,width:50,sortable:false,filterable:false}
]
function lookForData()
{
    const filteredRows = data.filter((row)=>
    row.name.toLowerCase().includes(searchText.toLowerCase()) ||
    row.email.toLowerCase().includes(searchText.toLowerCase()) ||
    row.role.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchData(filteredRows);
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
                placeholder="Пошук..." InputProps={{endAdornment:<Box sx={{display:"flex",flexDirection:"row"}}><IconButton onClick={lookForData}><Search/></IconButton><IconButton onClick={()=>{setSearchData(data);setSearchText("");}}><Cancel/></IconButton></Box>}}>
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
                    <TextField placeholder="Мейл" sx={{backgroundColor:"white",borderRadius:1}}>

                    </TextField>
                    <TextField placeholder="Роль" sx={{backgroundColor:"white",borderRadius:1}}>

                    </TextField>
                    <Box sx={{display:"flex",gap:2,width:"100%",mt:"auto"}}>
                        <Button sx={{backgroundColor:"#0B2E1C",justifySelf:"end",color:"white",flex:0.5,borderRadius:"20px"}}>
                            Відправити мeйл
                        </Button>
                        <Button sx={{backgroundColor:"#0B2E1C",justifySelf:"end",color:"white",flex:0.5,borderRadius:"20px"}}>
                            Скасувати
                        </Button>
                    </Box>
                </Box>
            </Drawer>
        </Box>
    )
}