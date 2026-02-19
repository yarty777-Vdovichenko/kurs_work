import { Avatar, Box, Color } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../assets/crm.png";

export default function Header({color}:{color?:string}) {
  return (
    <Box
      sx={{
        
        width: "100%",
        py: 1,
        px: 2,
        height:"50px",
        backgroundColor: !color ? "#4DA3FF" : "#1F4F34",
        display: "flex",
        alignItems: "center",
        gap: 2,
        position:"fixed",
        zIndex:999
      }}
    >
      <Avatar src={logo} sx={{ width: 30, height: 30 ,backgroundColor:"white", padding:"4px"}} />
      <Link to="/" style={{ display:"flex", alignItems:"center", gap: 0.5, textDecoration:"none", color:"white" }}>Home</Link>
      <Link to="/login" style={{ textDecoration:"none", color:"white" }}>Login</Link>
      <Link to="/register" style={{ textDecoration:"none", color:"white" }}>Register</Link>
      <Link to="/srm/dashboard" style={{ textDecoration:"none", color:"white" }}>Dashboard</Link>
    </Box>
  );
}


/*
Домашня сторінка / Dashboard	Dashboard	import DashboardIcon from '@mui/icons-material/Dashboard';
Клієнти / Контакти	Person, People	import PeopleIcon from '@mui/icons-material/People';
Продажі / Sales	AttachMoney, MonetizationOn	import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
Завдання / Tasks	Checklist, Assignment	import AssignmentIcon from '@mui/icons-material/Assignment';
Повідомлення / Messages	Mail, Chat	import MailIcon from '@mui/icons-material/Mail';
Налаштування / Settings	Settings	import SettingsIcon from '@mui/icons-material/Settings';
Звіти / Analytics	BarChart, Insights	import BarChartIcon from '@mui/icons-material/BarChart'; */