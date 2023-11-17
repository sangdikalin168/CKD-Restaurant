import { TypeOptions, toast } from "react-toastify";

export const toastify = (
  message: string,
  auto_Close: boolean | number,
  toastType: TypeOptions
) => {
  if (!toast.isActive("alert")) {
    toast(message, {
      autoClose: auto_Close ? 500 : false,
      toastId: "alert",
      type: toastType,
    });
  }
};
