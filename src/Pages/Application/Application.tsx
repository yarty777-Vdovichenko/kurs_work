import { useEffect, useState } from "react"
import { approveApplications, getApplications, rejectApplications } from "../../api/application.api";
import "../../styles/general.css"
import type { Request } from "../../types/types";
import { Button } from "@mui/material";

export default function Application(){
    const [apps,setApps]=useState<Request[]>([]);
    const [info,setInfo]=useState<string>("")

    useEffect(()=>{
        loadApps();
    },[])

    async function loadApps(){
        try{
            const responce = await getApplications();
            setApps(responce);
        }
        catch (err:any) {
            setInfo(err);
            setApps([]);
        }
    }

    async function approve(id:string){
        try{
            const responce = await approveApplications(id);
            setInfo(responce);
            await loadApps();
        }
        catch (err:any) {
            setInfo(err);
        }
    }

    async function refuse(id:string){
        try{
            const responce = await rejectApplications(id);
            setInfo(responce);
            await loadApps();
        }
        catch (err) {
            console.error(err);
        }
    }

    return(
        <div className="main_app">
            <div className="title">
                {info}
            </div>
            <div className="cardsField">
                {apps?.map(ap=>{return (
                <div key={ap.id} className="cardAppli">
                    <span>{ap.id}</span>
                    <span>{ap.name}</span>
                    <span>{ap.email}</span>
                    <span>{ap.status}</span>
                    <span>
                        Дата створення:{" "}
                        {new Date(ap.createdAt).toLocaleDateString("uk-UA", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        })}
                    </span>
                    <div className="buttons">
                        <Button 
                        sx={{
                            width:"100%",backgroundColor:"#32ac67",color:"white","&:hover": { backgroundColor: "#6ce19f" },
                            "@media (max-width: 700px)": { width: "100px" }
                            }}
                            onClick={()=>{approve(ap.id)}}>
                            Прийняти
                        </Button>
                        <Button 
                        sx={{
                            width:"100%",backgroundColor:"#ec813f",color:"white","&:hover": { backgroundColor: "#ff9f63" },
                            "@media (max-width: 700px)": { width: "100px" }
                            }}
                            onClick={()=>{refuse(ap.id)}}>
                            Відхилити
                        </Button>
                    </div>
                </div>
            )})}
            </div>
        </div>
    )
}