import { Box, Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import "../styles/dashboard.css"

export default function Dashboard() {

  return (
    <main>
      <div className='card'>
        Абоненти
      </div>
      <div className='card'>
        Активні СІМ
      </div>
      <div className='card'>
        Заблоковані
      </div>
      <div className='card'>
        Тарифи
      </div>
      <div className='card'>
        + нових за 7 днів
      </div>
      <div className='mainDiagram'>

      </div>
      <div className='lastActions'>

      </div>
      <div className='additionalDiagram'>

      </div>
      <div className='additionalDiagram'>

      </div>
    </main>
  );
}