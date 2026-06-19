import { Avatar, Box } from "@mui/material";
import logo from "../../assets/crm.png";

export default function Header({color}:{color?:string}) {
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
        gap: 2,
        position:"fixed",
        zIndex:999
      }}
    >
      <Avatar src={logo} sx={{ width: 30, height: 30 ,backgroundColor:"white", padding:"4px"}} />
    </Box>
  );
}