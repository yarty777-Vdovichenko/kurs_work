import { useNavigate } from "react-router-dom"
import "../styles/general.css"

export default function ForbiddenPage(){
    const nav = useNavigate();

    return(
        <div className="center">
            <h1>403</h1>
            <h2>Ви зайшли не на той район)</h2>
            <p>У вас недостатньо прав для перегляду цієї сторінки.</p>
            <button onClick={()=>{nav(-1)}}>Повернутися</button>
        </div>
    )
}