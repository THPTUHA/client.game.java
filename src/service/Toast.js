import { toast } from "react-toastify";

export class Toast {
    static error(message){
        toast.error(message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    static success(message){
        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
};