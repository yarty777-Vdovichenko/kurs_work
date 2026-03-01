import { Box, Button, IconButton, InputAdornment, TextField } from "@mui/material";
import back2 from "../assets/back2.jpg"
import {} from "@mui/icons-material"
import { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { register } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register()
{
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[name,setName]=useState("");
    const[loading,setLoading]=useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate=useNavigate();
    const userRegister = async () => {
        try
        {
            setLoading(true);
            await register(name,email,password);
            navigate("/srm/dashboard")
        }
        catch(error)
        {
            console.log("Error: ",error)
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
            minHeight: "100%",
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
       
            <Box sx={{
                backgroundColor:"#010101",
                minHeight: "100vh",
                width:"30%",
                paddingTop:"50px",  
                display:"flex",
                gap:4,
                flexDirection:"column",
                "@media (max-width: 1200px)": {
                    width: "50%",
                    paddingTop: "50px",
                },
                
                "@media (max-width: 900px)": {
                    width: "70%",
                    paddingTop: "30px",
                },
                
                "@media (max-width: 600px)": {
                    width: "100%",
                    paddingTop: "20px",
                }
            }}>
                <Box sx={{
                    width:"100%",
                    display:"flex",
                    gap:4,
                    flexDirection:"column",
                    alignItems:"center"
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24"><path fill="#4DA3FF" d="M15 4a4 4 0 0 0-4 4a4 4 0 0 0 4 4a4 4 0 0 0 4-4a4 4 0 0 0-4-4m0 1.9a2.1 2.1 0 1 1 0 4.2A2.1 2.1 0 0 1 12.9 8A2.1 2.1 0 0 1 15 5.9M4 7v3H1v2h3v3h2v-3h3v-2H6V7zm11 6c-2.67 0-8 1.33-8 4v3h16v-3c0-2.67-5.33-4-8-4m0 1.9c2.97 0 6.1 1.46 6.1 2.1v1.1H8.9V17c0-.64 3.1-2.1 6.1-2.1"
       /></svg>
                    <TextField variant="filled" label="name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    sx={{
                        backgroundColor:"#fff",
                        width:"80%"
                    }}></TextField>
                    <TextField variant="filled" label="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    sx={{
                        backgroundColor:"#fff",
                        width:"80%"
                    }}></TextField>
                    <Box sx={{width:"80%",display:"flex"}}>
                        <TextField 
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            variant="filled" 
                            label="password" 
                            type={showPassword ? "text" : "password"}
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
                        gap:2,
                        flexDirection:"column",
                        mt:8
                    }}> 
                        <Button  variant="contained" 
                        onClick={()=>userRegister()}
                        sx={{
                            py:2,
                            backgroundColor:"#FFB703",
                            color:"#000",
                            borderRadius:"15px",
                            transition:"0.3s",
                            
                            "&:hover":{backgroundColor:"#a27b18",color:"#fff"}
                        }}>
                            {loading? "Завантаження...":"Увійти"}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}