import { Avatar, Box, Drawer } from "@mui/material";
import { Dashboard, People, CreditCard, Group, ShowChart, ExitToApp } from "@mui/icons-material";
import { useState } from "react";

export default function RightPanel() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { text: "Дашборд", icon: <Dashboard /> },
    { text: "Користувачі", icon: <People /> },
    { text: "Тарифи", icon: <CreditCard /> },
    { text: "Абоненти", icon: <Group /> },
    { text: "Графіки", icon: <ShowChart /> },
  ];

  return (
    <Drawer
      open={true}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      variant="persistent"
      sx={{
        '& .MuiDrawer-paper': {
            width: open ? 170 : 60,
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
            {open && <Box sx={{ marginLeft: 2,fontSize:18}}>{item.text}</Box>}
          </Box>
        ))}
      </Box>
    </Drawer>
  );
}
