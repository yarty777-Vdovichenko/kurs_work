import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";


export default function BaseHome()
{

    return(
        <>
            <Header color="#8B5CF6" />
            <Outlet/>
        </>
    )
}