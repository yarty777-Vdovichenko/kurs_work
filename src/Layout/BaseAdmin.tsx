import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import RightPanel from "../Components/RightPanel";
import { useState } from "react";
import { Box } from "@mui/material";


export default function BaseAdmin()
{
    const [open,setOpen]=useState(false);

    return(
        <>
            <RightPanel open={open} setOpen={setOpen}/>
            <Header color="green" />
            <Box sx={{
                paddingTop:"50px",
                paddingLeft:open ? "170px" : "50px",
                transition:"0.3s",
            }}>
                <Outlet/>
            </Box>
        </>
    )
}