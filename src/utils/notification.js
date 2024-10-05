import { toast } from "react-hot-toast";

const options = {
  position: "top-right",
  duration: 10000,
};

export const successNotification = (message) => {
  toast.success(message, options);
};

export const errorNotification = (message) => {
  toast.error(message, options);
};
