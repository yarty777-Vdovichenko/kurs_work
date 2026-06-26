import { styled } from "@mui/material/styles";
import { TextField, Button } from "@mui/material";

export const AuthTextField = styled(TextField)({
    backgroundColor: "#fff",
    width: "80%"
});

export const AuthButton = styled(Button)({
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: "#FFB703",
    color: "#000",
    borderRadius: "15px",
    transition: "0.3s",
    "&:hover": {
        backgroundColor: "#a27b18",
        color: "#fff"
    }
});