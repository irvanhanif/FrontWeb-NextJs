import { Bounce, toast } from "react-toastify";

const errorToast = (error) => {
  return toast.error(error, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });
};

export default errorToast;
