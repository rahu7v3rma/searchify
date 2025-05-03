"use client";
import { createContext, ReactNode, useState } from "react";

export const LoaderContext = createContext({
  loading: false,
  setLoading: (loading: boolean) => {},
});

export default function LoaderProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);
  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoaderContext.Provider>
  );
}
