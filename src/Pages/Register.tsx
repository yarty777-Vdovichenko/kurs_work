import { Box, Button, IconButton, InputAdornment, TextField } from "@mui/material";
import back2 from "../assets/back2.jpg"
import {} from "@mui/icons-material"
import { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Register()
{

    const [showPassword, setShowPassword] = useState(false);

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
       
            <Box sx={{
                backgroundColor:"#010101",
                height:"100vh",
                width:"30%",
                paddingTop:"50px",
                display:"flex",
                gap:4,
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
                    gap:4,
                    flexDirection:"column",
                    alignItems:"center"
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24"><path fill="#4DA3FF" d="M15 4a4 4 0 0 0-4 4a4 4 0 0 0 4 4a4 4 0 0 0 4-4a4 4 0 0 0-4-4m0 1.9a2.1 2.1 0 1 1 0 4.2A2.1 2.1 0 0 1 12.9 8A2.1 2.1 0 0 1 15 5.9M4 7v3H1v2h3v3h2v-3h3v-2H6V7zm11 6c-2.67 0-8 1.33-8 4v3h16v-3c0-2.67-5.33-4-8-4m0 1.9c2.97 0 6.1 1.46 6.1 2.1v1.1H8.9V17c0-.64 3.1-2.1 6.1-2.1"
       /></svg>
                    <TextField variant="filled" label="email" sx={{
                        backgroundColor:"#fff",
                        width:"80%"
                    }}></TextField>
                    <TextField variant="filled" label="name" sx={{
                        backgroundColor:"#fff",
                        width:"80%"
                    }}></TextField>
                    
                     <TextField 
                        variant="filled" 
                        label="password" 
                        type={showPassword ? "text" : "password"}  // ← перемикання типу
                        sx={{
                            backgroundColor:"#fff",
                            width:"80%"
                        }}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                                >
                                {showPassword ?  <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                            </InputAdornment>
                            )
                        }}
                    />
                    <Box 
                    sx={{
                        width:"80%",
                        display:"flex",
                        gap:2,
                        flexDirection:"column",
                        mt:6
                    }}>
                        <Button  variant="contained" 
                        sx={{
                            py:2,
                            backgroundColor:"white",
                            color:"black",
                            borderRadius:"15px",
                            transition:"0.3s",
                            "&:hover":{backgroundColor:"gray",color:"#fff"}
                        }}>
                            Google
                        </Button>
                        <Button  variant="contained" 
                        sx={{
                            py:2,
                            backgroundColor:"#FFB703",
                            color:"#000",
                            borderRadius:"15px",
                            transition:"0.3s",
                            
                            "&:hover":{backgroundColor:"#a27b18",color:"#fff"}
                        }}>
                            Увійти
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}