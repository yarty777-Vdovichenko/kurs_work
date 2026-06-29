import { IconButton } from "@mui/material";
import { Refresh } from "@mui/icons-material";
import { type ReactNode } from "react";

interface FloatingActionButtonsProps {
    onRefresh: () => void;
    onAdd?: () => void;       // необов'язково -- Users цю кнопку не має
    className?: string;       // бо в Abonents клас динамічний (з "open"), в інших -- статичний
    addIcon?: ReactNode;      // дозволяє підмінити іконку "+", якщо колись знадобиться
}

const buttonSx = {
    backgroundColor: "#ec813f",
    color: "white",
    transition: "0.3s",
    "&:hover": { backgroundColor: "#26382e" }
};

export function FloatingActionButtons({ onRefresh, onAdd, className }: FloatingActionButtonsProps) {
    return (
        <div className={className}>
            <IconButton
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                sx={buttonSx}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8 6l4-4l4 4m-4-4v20" />
                </svg>
            </IconButton>

            {onAdd &&
                <IconButton onClick={onAdd} sx={buttonSx}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2" />
                    </svg>
                </IconButton>
            }

            <IconButton onClick={onRefresh} sx={buttonSx}>
                <Refresh />
            </IconButton>
        </div>
    );
}