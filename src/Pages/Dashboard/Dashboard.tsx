import { getStats } from "../../api/analitics.api";
import "../../styles/dashboard.css"
import { useEffect, useState } from "react";
import { type SimsByTarif, type Stats, type SubscribersByDay } from "../../types/types";
import { PieChart, Pie, Cell,  LineChart,Line,XAxis,YAxis,Tooltip,ResponsiveContainer,CartesianGrid } from "recharts"; 

const COLORS = [
  "#00ff88",
  "#00bfff",
  "#ff7b54",
  "#ffd166",
  "#c77dff"
];

export default function Dashboard() {
  const [stat,setStat]=useState<Stats>()
  const [simXTarif,setSimXTarif]=useState<SimsByTarif[]>([])
  const [subXDay,setSubXDay]=useState<SubscribersByDay[]>([])

  useEffect(()=>{
    statsInfo();
  },[]) 

  async function statsInfo(){
    const stats = await getStats();
    setStat(stats);
    setSimXTarif(stats.simsByTarif);  
    setSubXDay(stats.subscribersByDay);
  }
  
  return (
    <div className="main">
      <div className='card card--variantB'>
        <p className='card__title card__title--blue'>Абоненти</p>
        <span  className="card__data card__data--blue">{stat?.totalSubscribers}</span>
      </div>
      <div className='card card--variantA'>
        <p className='card__title card__title--green'>Активні СІМ</p>
        <span  className="card__data card__data--green">{stat?.activeSims}</span>
      </div>
      <div className='card card--variantC'>
        <p className='card__title card__title--red'>Заблоковані</p>
        <span  className="card__data card__data--red">{stat?.blockedSims}</span>
      </div>
      <div className='card card--variantB'>
        <p className='card__title card__title--blue'>Тарифи</p>
        <span  className="card__data card__data--blue">{stat?.totalTarifs}</span>
      </div>
      <div className='card card--variantA'>
        <p className='card__title card__title--green'>+ нових за 7 днів</p>
        <span  className="card__data card__data--green">+{stat?.newSubscribersLast7Days}</span>
      </div>
      <div className='mainDiagram'>
        <h2 className="diagramTitle">
          SIM по тарифах
        </h2>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={simXTarif}
              dataKey="count"
              nameKey="tarifName"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label={({ tarifName, percent }: any) =>
                `${tarifName} ${(percent * 100).toFixed(0)}%`
              }
            >
              {simXTarif.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className='mainDiagram'>
        <h2 className="diagramTitle">
          Нові абоненти
        </h2>

        <div style={{ width: "100%", height: "400px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={subXDay}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="date" stroke="#ffffff"/>

              <YAxis  stroke="#ffffff"/>

              <Tooltip />

              <Line
                type="monotone"
                dataKey="count"
                stroke="#00ff88"
                strokeWidth={4}
              />

            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}