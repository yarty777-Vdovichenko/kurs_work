import { Avatar, Box, Drawer } from "@mui/material";
import { Dashboard, CreditCard, Group, ShowChart, ExitToApp, PersonOutline } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RightPanel({open,setOpen}:{open:boolean;setOpen:(value:boolean)=>void}) {
 const navigate = useNavigate();
  const menuItems = [
    { text: "Дашборд", icon: <Dashboard />,path:"dashboard" },
    { text: "Користувачі", icon: <PersonOutline />,path:"users" },
    { text: "Тарифи", icon: <CreditCard />,path:"abonents" },
    { text: "Абоненти", icon: <Group />,path:"tarifs" },
    { text: "Графіки", icon: <ShowChart /> ,path:"charts"},
  ];

  return (
    <Drawer
      open={true}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      variant="persistent"
      sx={{
        '& .MuiDrawer-paper': {
            width: open ? 170 : 50,
            transition: "width 0.3s",
            minHeight: "100vh",
            border: "none",
            overflowX: "hidden",
            backgroundColor: "#1F4F34",
            color: "white",
            paddingTop: "50px",
            top: "0px",
            left: "0px",
            zIndex: 1,
            display:"flex",
            flexDirection:"column",
            justifyContent:"space-between"
        },
      }}
    >
      <Box>
        {menuItems.map((item) => (
          <Box
            onClick={() => {
              navigate(item.path);
            }}
            key={item.text}
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "12px 4px",
              cursor: "pointer",
              "&:hover": { backgroundColor: "#3C7B56" },
            }}
          >
            <Box sx={{ display: "flex", color: "white", minWidth: 40, justifyContent: "center" }}>
              {item.icon}
            </Box>
            {open && <Box sx={{ marginLeft: 2,fontSize:18,transition:"0.3s"}}>{item.text}</Box>}
          </Box>
        ))}
      </Box>
      <Box>
        <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "12px 4px",
              cursor: "pointer",
              backgroundColor:"#9ACFB1",
              transition:"0.3s",
              "&:hover": { backgroundColor: "#3C7B56" },
            }}
          >
            <Box sx={{ display: "flex", color: "white", minWidth: 40, justifyContent: "center" }}>
              <ExitToApp/>
            </Box>
            {open && <Box sx={{ marginLeft: 2,fontSize:18}}>Вихід</Box>}
          </Box>
      </Box>
    </Drawer>
  );
}
