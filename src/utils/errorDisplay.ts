import {toast} from "react-toastify";

export default function errorDisplay(message: string) {
    toast.error(message)
}