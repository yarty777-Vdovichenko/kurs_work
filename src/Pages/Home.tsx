import { Button  } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../styles/homePage.css"

export default function Home()
{
    const navigate=useNavigate();

    return(
    <div className="backgroud">
        <div className="hero">
            <div className="info">
                <div className="info__header"><span className="info__header--purple">Мобільний</span> оператор</div>
                <div className="info__additional">Керуйте процесами, а не хаосом.</div>
            </div>
            <div className="buttons">
            <Button variant="contained" 
            sx=
            {{
                backgroundColor:"#BA6EED", 
                color:"#fff",
                p:1,
                zIndex:90,
                transition:"0.3s",
                "&:hover":{bgcolor:"#752ca5"}
            }}
            onClick={()=>navigate("/login")}>Увійти</Button>
            <Button variant="contained"     
            sx={{
                backgroundColor:"#BA6EED", 
                color:"#fff",
                p:1,
                zIndex:90,
                transition:"0.3s",
                "&:hover":{bgcolor:"#752ca5"}
            }}
            onClick={()=>navigate("/register")}>Надіслати заявку</Button>           
            </div>

            <svg className="svg--left" width="519" height="672" viewBox="0 0 719 872" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M45.4864 -168.778C157.906 -236.248 277.931 -316.021 381.659 -325.449C485.868 -334.442 573.893 -274.184 633.018 -194.483C692.624 -114.347 723.329 -14.7675 717.266 88.7712C710.607 192.97 667.18 301.128 599.651 382.748C531.044 464.594 438.931 519.24 362.032 549.281C285.132 579.321 224.637 583.434 157.695 639.23C90.2716 694.591 16.5152 800.54 -61.3882 845.247C-139.292 889.955 -222.533 874.742 -255.426 816.314C-288.318 757.886 -270.976 657.337 -273.205 572.67C-274.838 487.343 -295.562 418.333 -299.26 327.549C-303.44 236.33 -291.19 123.999 -231.823 39.8066C-172.937 -44.8202 -67.5285 -100.647 45.4864 -168.778Z" fill="#8B5CF6"/>
            </svg>
            <svg className="svg--right" width="585" height="274" viewBox="0 0 685 374" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M618.861 8.84409C712.594 15.9626 816.198 19.6614 878.593 52.864C941.059 86.4618 962.879 149.053 959.645 210.873C956.483 273.088 928.267 334.53 877.652 384.515C826.402 434.615 752.754 473.256 677.71 489.698C601.959 505.859 525.447 499.706 468.678 486.713C411.908 473.72 376.151 453.658 313.212 457.294C250.202 460.535 160.575 486.964 96.5545 480.999C32.5339 475.034 -7.14985 436.904 1.07423 395.409C9.2983 353.914 64.8669 309.564 102.231 266.06C140.23 222.442 160.095 180.064 199.426 132.938C238.686 85.4172 296.775 33.263 368.422 12.5377C439.997 -8.58285 524.493 1.84047 618.861 8.84409Z" fill="#8B5CF6"/>
            </svg>
        </div>
    </div>
    )
}