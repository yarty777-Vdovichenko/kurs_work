import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import RightPanel from "../Components/RightPanel";


export default function BaseAdmin()
{

    return(
        <>
        <RightPanel />
            <Header color="green" />
            
            <Outlet/>
        </>
    )
}