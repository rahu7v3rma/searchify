"use client";

import { LoaderContextType } from "@/utils/types";
import { createContext, useCallback, useState } from "react";

export const LoaderContext = createContext<LoaderContextType>({
  isOpen: false,
  openLoader: () => {},
  closeLoader: () => {},
});

const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openLoader = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeLoader = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <LoaderContext.Provider
      value={{
        isOpen,
        openLoader,
        closeLoader,
      }}
    >
      {children}
    </LoaderContext.Provider>
  );
};

export default LoaderProvider;
