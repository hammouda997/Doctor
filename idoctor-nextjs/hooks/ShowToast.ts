import {Theme, toast} from "react-toastify";

export const showToast = (
  message: string,
  type: "success" | "default" | "info" | "warning" | "error"
) => {
  toast(message, {
    type,
    theme: (localStorage.getItem("chakra-ui-color-mode") as Theme) || "colored",
  });
};
