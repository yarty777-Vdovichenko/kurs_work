import { Navigate } from "react-router-dom";
import { useRole } from "../../hooks/useRole";

export default function PrivatRoute({children,alloweddRoles}:{children:React.ReactNode,alloweddRoles:string[]}) {
    const token = localStorage.getItem("accessToken");
    const role = useRole();

    if(!token){
        return <Navigate to="/" />;
    }

    if(!alloweddRoles.includes(role ?? "")){
        return <Navigate to="/forbiden" />;
    }

    return <>{children}</>
}