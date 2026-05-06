import { getStats } from "../../api/analitics.api";
import "../../styles/dashboard.css"
import { useEffect, useState } from "react";
import { type Stats } from "../../types/types";

export default function Dashboard() {
  const [stat,setStat]=useState<Stats>()

  useEffect(()=>{
    statsInfo();
  },[])

  async function statsInfo(){
    const stats = await getStats();
    setStat(stats)
  }
  
  return (
    <div className="main">
      <div className='card card--variantA'>
        <p className='card__title'>Абоненти</p>
        {stat?.totalSubscribers}
      </div>
      <div className='card card--variantA'>
        <p className='card__title'>Активні СІМ</p>
        {stat?.activeSims}
      </div>
      <div className='card card--variantB'>
        <p className='card__title'>Заблоковані</p>
        {stat?.blockedSims}
      </div>
      <div className='card card--variantC'>
        <p className='card__title'>Тарифи</p>
        {stat?.totalTarifs}
      </div>
      <div className='card card--variantA'>
        <p className='card__title'>+ нових за 7 днів</p>
        {stat?.newSubscribersLast7Days}
      </div>
      <div className='mainDiagram'>

      </div>
      <div className='mainDiagram'>

      </div>
    </div>
  );
}