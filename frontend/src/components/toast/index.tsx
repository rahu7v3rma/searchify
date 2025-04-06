"use client";

import Text from "@/components/text";
import { ToastContext } from "@/context/toast";
import { memo, useContext } from "react";

const Toast = memo(() => {
  const { toastMessage, toastType, isOpen } = useContext(ToastContext);

  if (!isOpen) return null;

  const toastTypeClass =
    toastType === "error"
      ? "bg-toast-background-error"
      : toastType === "info"
      ? "bg-toast-background-info"
      : "bg-toast-background-success";

  return (
    <div
      className={`break-all absolute top-20 right-10 z-50 max-w-[300px] rounded-md flex items-center justify-center p-2 ${toastTypeClass}`}
    >
      <Text>{toastMessage}</Text>
    </div>
  );
});

export default Toast;
