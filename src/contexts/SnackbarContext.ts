import { createContext } from "react";
import type { Type } from "../types/types";

interface SnackbarContextType {
    showSnackbar: (message: string, type: Type) => void;
}

export const SnackbarContext = createContext<SnackbarContextType>({
    showSnackbar: () => {},
});