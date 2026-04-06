import { Avatar, Box, Button,  Typography } from "@mui/material";
import back1 from "../assets/back1.jpg";
import logo from "../assets/crm.png";
import { useNavigate } from "react-router-dom";

export default function Home()
{
    const navigate=useNavigate();

    return(
        <>
            <img src={back1} style={{
                transform: "scaleX(-1)",
                position:"absolute",
                left:"20%",
                top:"5%",
                width:"80%",
                height:"95%",
                pointerEvents: "none"
            }}/>
            
            <Box sx={{
                position: "fixed",
                transform: "scaleX(-1)",
                left: 0,
                top: 0,
                width: "100%",
                height: "100vh",
                background: "linear-gradient(90deg, rgba(14,17,23,0) 0%, rgba(14,17,23,0) 40%, rgba(14,17,23,0.8) 70%, #0E1117 100%)",
                zIndex: 1,
                pointerEvents: "none",
            }} />
            <Box sx={{minHeight:"100vh",width:"100%", backgroundColor:"#0E1117",display:"flex",flexDirection:"column",paddingTop:"100px",}}>
                
                <Typography variant="h2" sx={{color:"#fff",pl:2,zIndex:90}}>
                <span style={{ fontWeight: 600, color: "#FFB703" }}>Мобільний</span> <i>оператор</i>
                </Typography>

                <Typography variant="h5" sx={{color:"#fff",pl:2,zIndex:90,fontWeight:"100"}}><i>Керуйте процесами, а не хаосом.</i></Typography>
                
                <Box sx=
                {{
                    width:"40%",
                    display:"flex",
                    flexDirection:"row",
                    my:10,
                    justifyItems:"center",
                    p:4,
                    gap:6,
                    zIndex:90,
                    "@media (max-width: 600px)": {
                        alignItems:"center",
                        flexDirection:"column",
                         width:"20%",
                         pl:20,
                    }
                }}>
                    <Avatar src={logo} sx={{ width: 100, height: 100 ,backgroundColor:"white", padding:"10px"}} />
                    <Box sx={{display:"flex",flexDirection:"column", gap:3,width:300,zIndex:90}}>
                        <Button variant="contained" 
                        sx=
                        {{
                            backgroundColor:"#4DA3FF", 
                            color:"#000",
                            p:1,
                            zIndex:90,
                            transition:"0.3s",
                            "&:hover":{bgcolor:"#2a629e",color:"#fff"}
                        }}
                        onClick={()=>navigate("/login")}>Увійти</Button>
                        <Button variant="contained" 
                        sx={{
                            backgroundColor:"#FFB703", 
                            color:"#000",
                            p:1,
                            zIndex:90,
                            transition:"0.3s",
                            "&:hover":{bgcolor:"#956d07",color:"#fff"}
                        }}
                        onClick={()=>navigate("/register")}>Зареєструватися</Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}