import {toast} from "react-toastify";

export default function errorDisplay(error: any) {
    toast.error(error.message || error.data || 'Something went wrong')
}