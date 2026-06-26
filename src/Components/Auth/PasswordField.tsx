import { Box, IconButton } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { AuthTextField } from "../styled/AuthComponents";

interface PasswordFieldProps {
    value: string;
    onChange: (value: string) => void;
    showPassword: boolean;
    onToggle: () => void;
}

export function PasswordField({ value, onChange, showPassword, onToggle }: PasswordFieldProps) {
    return (
        <Box sx={{ width: "80%", display: "flex" }}>
            <AuthTextField
                variant="filled"
                label="password"
                type={showPassword ? "text" : "password"}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <IconButton sx={{ color: "white" }} onClick={onToggle} edge="end">
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
        </Box>
    );
}