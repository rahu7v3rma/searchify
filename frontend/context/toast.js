"use client";
import { createContext, useContext, useState } from "react";

export const ToastContext = createContext({
  toasts: [],
  showToast: () => {},
});

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = (message) => {
    const id = Date.now();
    const newToast = { id, message };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  return useContext(ToastContext);
};
