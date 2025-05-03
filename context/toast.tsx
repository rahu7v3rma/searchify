"use client";
import { createContext, ReactNode, useState, useEffect } from "react";

type Toast = {
  id: number;
  message: string;
};

export const ToastContext = createContext<{
  toasts: Toast[];
  showToast: (message: string) => void;
}>({
  toasts: [],
  showToast: () => {},
});

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string) => {
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
