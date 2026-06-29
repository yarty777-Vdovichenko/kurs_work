import { IconButton } from "@mui/material";
import { Clear, Delete } from "@mui/icons-material";

interface SelectionBarProps {
    selectedCount: number;
    placeholder: string;
    selectedLabel: string;
    onDelete: () => void;
    onClear: () => void;
    simpleClassName: string;
    menuClassName: string;
}

export function SelectionBar({
    selectedCount,
    placeholder,
    selectedLabel,
    onDelete,
    onClear,
    simpleClassName,
    menuClassName
}: SelectionBarProps) {
    if (selectedCount === 0) {
        return (
            <div className={simpleClassName}>
                <p><i>{placeholder}</i></p>
            </div>
        );
    }

    return (
        <div className={menuClassName}>
            <p>{selectedLabel}: {selectedCount}</p>
            <div>
                <IconButton onClick={onDelete}>
                    <Delete sx={{ fontSize: "32px", color: "white" }} />
                </IconButton>
                <IconButton onClick={onClear}>
                    <Clear sx={{ fontSize: "32px", color: "white" }} />
                </IconButton>
            </div>
        </div>
    );
}