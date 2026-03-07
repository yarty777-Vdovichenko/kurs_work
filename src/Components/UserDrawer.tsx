import { Button, IconButton, TextField } from "@mui/material"
import "../styles/Base.css"
import { Close } from "@mui/icons-material"

export default function Drawer({setOpen}:{setOpen:(value:boolean)=>void}){
    return(
        <div className="drawerMain">
            <h3>Створити користувача</h3>
            <TextField placeholder="email" sx={{backgroundColor:"white",width:"80%",borderRadius:1}}>

            </TextField>
            <TextField placeholder="name" sx={{backgroundColor:"white",width:"80%",borderRadius:1}}>

            </TextField>
            <TextField placeholder="role" sx={{backgroundColor:"white",width:"80%",borderRadius:1}}>

            </TextField>
            <IconButton 
            onClick={()=>setOpen(false)}
            sx={{
                position:"absolute",
                top:50,
                right:10,
                color:"white    "
            }}>
                <Close/>
            </IconButton>
            <div style={{width:"80%",display:"flex",gap:"10px",paddingTop:"50px"}}>            
                <Button sx={{
                    backgroundColor:"#9ACFB1",flex:1,p:2,color:"white"
                }}>Підтвердити</Button>
                <Button sx={{
                    backgroundColor:"#c86426",flex:1,p:2,color:"white"
                }}>Відмінити</Button>
            </div>
        </div>
    )
}