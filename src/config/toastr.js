import { toast } from "react-toastify";


const notify = (msg, type) => {
  switch (type) {
    case "success":
      toast.success(msg, {
        position: "top-right",
        closeButton: false,
        className: "p-2 w-[400px] bg-white",
        autoClose: 2000,
      });
      break;
    case "error":
      toast.error(msg, {
        closeButton: false,
        className: "p-2 w-[400px] bg-white",
        autoClose: 2000,
      });
      break;
    case "info":
      toast.info(msg, {
        closeButton: false,
        className: "p-2 w-[400px] bg-white",
        autoClose: 2000,
      });
      break;
    case "warning":
      toast.warning(msg, {
        closeButton: false,
        className: "p-2 w-[400px] bg-white",
        autoClose: 2000,
      });
      break;
    default:
      toast(msg, {
        closeButton: false,
        className: "p-2 w-[400px] bg-white",
        autoClose: 2000,
      });
      break;
  }
};

export default notify;