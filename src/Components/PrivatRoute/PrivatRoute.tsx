import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

export default function PrivatRoute({children,alloweddRoles}:{children:React.ReactNode,alloweddRoles:string[]}) {
    const token = useSelector((state:RootState)=>state.auth.accessToken)
    const role = useSelector((state: RootState) => state.auth.role);;

    if(!token){
        return <Navigate to="/" />;
    }

    if(!alloweddRoles.includes(role ?? "")){
        return <Navigate to="/forbiden" />;
    }

    return <>{children}</>
}