import { Box, Button, IconButton, TextField } from "@mui/material";
import back2 from "../assets/back2.jpg"
import {} from "@mui/icons-material"
import { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { login } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login()
{
    const [email,setEmail]=useState<string>("");
    const [password,setPassword]=useState<string>("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate= useNavigate();
    const [loading,setLoading]=useState(false);

    const  userLogin = async () =>
    {
        try
        {
            setLoading(true);

            const response = await login(email,password);
            
            navigate("/srm/dashboard")
        }
        catch (Eror)
        {
            console.log("Error API:",Eror)
        }
        finally
        {
            setLoading(false);
        }
    }

    return(
        <>
        
                <Box
        component="img"
        src={back2}
        sx={{
            position: "absolute",
            width: "70%",
            left: "30%",
            height: "100%",
            boxShadow: "0 0 40px rgb(255, 255, 255)",
            objectFit: "cover",
            
            "@media (max-width: 1200px)": {
            width: "50%",
            left: "50%",
            },
            "@media (max-width: 900px)": {
            width: "30%",
            left: "70%",
            },
            "@media (max-width: 600px)": {
            width: "0%",
            left: "100%",
            opacity: 0,
            }
        }}
        />
        <svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 20 20" style={{
                position:"absolute",
                top:"-10%",
                left:"-10%",
                zIndex:0,     
            }}><path fill="#4DA3FF" d="M9.76 0C15.417 0 20 4.477 20 10S15.416 20 9.76 20c-3.191 0-6.142-1.437-8.07-3.846a.644.644 0 0 1 .115-.918a.68.68 0 0 1 .94.113a8.96 8.96 0 0 0 7.016 3.343c4.915 0 8.9-3.892 8.9-8.692s-3.985-8.692-8.9-8.692a8.96 8.96 0 0 0-6.944 3.255a.68.68 0 0 1-.942.101a.644.644 0 0 1-.103-.92C3.703 1.394 6.615 0 9.761 0m.545 6.862l2.707 2.707c.262.262.267.68.011.936L10.38 13.15a.66.66 0 0 1-.937-.011a.66.66 0 0 1-.01-.937l1.547-1.548l-10.31.001A.66.66 0 0 1 0 10c0-.361.3-.654.67-.654h10.268L9.38 7.787a.66.66 0 0 1-.01-.937a.66.66 0 0 1 .935.011"
            /></svg>
            <Box sx={{
                backgroundColor:"#010101",
                minHeight: "100vh",
                width:"30%",
                paddingTop:"200px",
                display:"flex",
                gap:10,
                flexDirection:"column",
                "@media (max-width: 1200px)": {
                    width: "50%",
                    paddingTop: "150px",
                },
                
                "@media (max-width: 900px)": {
                    width: "70%",
                    paddingTop: "120px",
                },
                
                "@media (max-width: 600px)": {
                    width: "100%",
                    paddingTop: "100px",
                }
            }}>
                <Box sx={{
                    width:"100%",
                    display:"flex",
                    gap:10,
                    flexDirection:"column",
                    alignItems:"center"
                }}>
                    <TextField variant="filled" label="email" 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        sx={{
                            backgroundColor:"#fff",
                            width:"80%"

                        }}>
                    </TextField>
                    <Box sx={{width:"80%",display:"flex"}}>
                        <TextField 
                            variant="filled" 
                            label="password" 
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            sx={{
                                backgroundColor:"#fff",
                                width:"80%",flex:"80%"
                            }}
                        ></TextField>
                        <IconButton sx={{color:"white"}}
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            >
                            {showPassword ?  <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                    </Box>
                    <Box 
                    sx={{
                        width:"80%",
                        display:"flex",
                        gap:6,
                        flexDirection:"column",
                        marginTop:12
                    }}>
                        <Button  variant="contained" 
                        onClick={()=>userLogin()}
                        sx={{
                            py:2,
                            backgroundColor:"#FFB703",
                            color:"#000",
                            borderRadius:"15px",
                            transition:"0.3s",
                            
                            "&:hover":{backgroundColor:"#a27b18",color:"#fff"}
                        }}>
                            {!loading ? "Увійти" : "Завантаження..."}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}