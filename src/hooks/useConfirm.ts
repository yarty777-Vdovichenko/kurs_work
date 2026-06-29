import { useState, useCallback } from "react";

function useConfirm() {
    const [openDialog, setOpenDialog] = useState(false);
    const [message, setMessage] = useState("");
    const [resolver, setResolver] = useState<((value: boolean) => void) | null>(null);

    const confirm = useCallback((msg: string): Promise<boolean> => {
        setMessage(msg);
        setOpenDialog(true);
        return new Promise((resolve) => {
            setResolver(() => resolve);
        });
    }, []);

    const handleConfirm = () => {
        resolver?.(true);
        setOpenDialog(false);
    };

    const handleCancel = () => {
        resolver?.(false);
        setOpenDialog(false);
    };

    return { confirm, openDialog, message, handleConfirm, handleCancel };
}

export default useConfirm;