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
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 128 128"><path fill="#fff" d="M44.59 4.21a63.28 63.28 0 0 0 4.33 120.9a67.6 67.6 0 0 0 32.36.35a57.13 57.13 0 0 0 25.9-13.46a57.44 57.44 0 0 0 16-26.26a74.3 74.3 0 0 0 1.61-33.58H65.27v24.69h34.47a29.72 29.72 0 0 1-12.66 19.52a36.2 36.2 0 0 1-13.93 5.5a41.3 41.3 0 0 1-15.1 0A37.2 37.2 0 0 1 44 95.74a39.3 39.3 0 0 1-14.5-19.42a38.3 38.3 0 0 1 0-24.63a39.25 39.25 0 0 1 9.18-14.91A37.17 37.17 0 0 1 76.13 27a34.3 34.3 0 0 1 13.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.2 61.2 0 0 0 87.2 4.59a64 64 0 0 0-42.61-.38"/><path fill="#e33629" d="M44.59 4.21a64 64 0 0 1 42.61.37a61.2 61.2 0 0 1 20.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.3 34.3 0 0 0-13.64-8a37.17 37.17 0 0 0-37.46 9.74a39.25 39.25 0 0 0-9.18 14.91L8.76 35.6A63.53 63.53 0 0 1 44.59 4.21"/><path fill="#f8bd00" d="M3.26 51.5a63 63 0 0 1 5.5-15.9l20.73 16.09a38.3 38.3 0 0 0 0 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 0 1-5.5-40.9"/><path fill="#587dbd" d="M65.27 52.15h59.52a74.3 74.3 0 0 1-1.61 33.58a57.44 57.44 0 0 1-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0 0 12.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68"/><path fill="#319f43" d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0 0 44 95.74a37.2 37.2 0 0 0 14.08 6.08a41.3 41.3 0 0 0 15.1 0a36.2 36.2 0 0 0 13.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 0 1-25.9 13.47a67.6 67.6 0 0 1-32.36-.35a63 63 0 0 1-23-11.59A63.7 63.7 0 0 1 8.75 92.4"/></svg>
                            oogle
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