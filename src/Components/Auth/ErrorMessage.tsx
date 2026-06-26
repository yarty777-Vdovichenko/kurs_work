import { Box } from "@mui/material";

interface ErrorMessageProps {
    message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
    if (!message) return null;

    return (
        <Box sx={{ color: "red", display: "flex", justifyContent: "center", fontSize: "24px" }}>
            {message}
        </Box>
    );
}