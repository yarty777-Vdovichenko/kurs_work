import { Avatar, Box, Typography } from "@mui/material";
import logo from "../../assets/crm.png";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

export default function Header({color}:{color?:string}) {
  const role = useSelector((state:RootState)=>state.auth.role)

  return (
    <Box
      sx={{
        
        width: "100%",
        py: 1,
        px: 2,
        height:"50px",
        backgroundColor: color,
        display: "flex",
        alignItems: "center",
        justifyContent:"space-between",
        gap: 2,
        position:"fixed",
        zIndex:999
      }}
    >
      <Avatar src={logo} sx={{ width: 30, height: 30 ,backgroundColor:"white", padding:"4px"}} />
      <Typography sx={{color:"white"}}>
        {role}
      </Typography>
    </Box>
  );
}