"use client";
import React from "react";
import { useToast } from "../context/toast";

export default function Toast() {
  const { toasts } = useToast();

  if (!toasts.length) return null;

  return (
    <div className="fixed top-[100px] right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-primary-toast-background text-white px-4 py-2 rounded-lg shadow-lg max-w-sm transition-all"
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
