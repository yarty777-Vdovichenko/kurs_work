import { Box, Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';

export default function Dashboard() {
const [data,setData]=useState([
  {name:"Абоненти",number:"49935",color:"white"},
  {name:"Активні сім",number:"59935",color:"lightBlue"},
  {name:"Заблоковані",number:"4935",color:"#FF8181"},
  {name:"Тарифи",number:"49",color:"white"},
  {name:"+ за 7 днів",number:"+435",color:"lightGreen"},
])

  return (
    <>
      <Box sx={{
        minHeight:"calc(100vh - 50px)",
        minWidth:"100vh",
        backgroundColor:"#0B2E1C",
        display:'flex',
        flexDirection:"column",
        gap:1,
        py:1,
      }}>
        <Box sx={{
          display:"flex",
        }}>
          {data.map(dat => (
            <Box key={dat.name} sx={{
              height:"160px",
              width:"20%",
              borderRadius:"20px",
              backgroundColor:"#1F4F34",
              display:'flex',
              flexDirection:"column",
              alignItems:"center",
              justifyContent:"center",
              mx:1
            }}>
              <Typography variant='h4' sx={{color:dat.color}}>{dat.name}</Typography>
              <Typography variant='body1' sx={{color:dat.color}}>{dat.number}</Typography>
            </Box>
          ))}
        </Box>
        <Box sx={{display:"flex",flexDirection:"row",gap:1,flex:1,px:1}}>
          <Box sx={{flex:0.63,display:'flex',flexDirection:"column",gap:1}}>
            <Box sx={{flex:0.63, backgroundColor:"#1F4F34",borderRadius:"20px"}}>
              <Typography variant='h3' sx={{color:"white"}}>Графік озподіл по тарифах</Typography>
            </Box>
            <Box sx={{flex:0.37,display:'flex',gap:1}}>
              <Box sx={{flex:0.5, backgroundColor:"#1F4F34",borderRadius:"20px"}}>
                <Typography variant='h3' sx={{color:"white"}}>Графік активні заблоквані</Typography>
              </Box>
              <Box sx={{flex:0.5, backgroundColor:"#1F4F34",borderRadius:"20px"}}>
                <Typography variant='h3' sx={{color:"white"}}>Графік кількості абонентів</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{flex:0.37, backgroundColor:"#1F4F34",borderRadius:"20px"}}>
            <Typography variant='h3' sx={{color:"white"}}>Останні дії</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}