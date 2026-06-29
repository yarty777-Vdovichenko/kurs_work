import { useContext } from "react";
import { SnackbarContext } from "../contexts/SnackbarContext";

export default function useSnackbar() {
    return useContext(SnackbarContext);
}