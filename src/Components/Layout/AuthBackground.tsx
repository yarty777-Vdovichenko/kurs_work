import { Box } from "@mui/material";
import back2 from "../../assets/back2.jpg";

export function AuthBackground() {
    return (
        <Box
            component="img"
            src={back2}
            sx={{
                position: "absolute",
                width: "70%",
                left: "30%",
                height: "100%",
                boxShadow: "0 0 40px rgb(255, 255, 255)",
                objectFit: "cover",
                "@media (max-width: 1200px)": { width: "50%", left: "50%" },
                "@media (max-width: 900px)": { width: "30%", left: "70%" },
                "@media (max-width: 600px)": { width: "0%", left: "100%", opacity: 0 }
            }}
        />
    );
}