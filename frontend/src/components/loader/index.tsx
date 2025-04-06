"use client";

import { memo, useContext } from "react";
import { LoaderContext } from "@/context/loader";

const Loader = memo(() => {
  const { isOpen } = useContext(LoaderContext);

  if (!isOpen) return null;

  return (
    <div className="flex justify-center items-center h-screen absolute z-50 bg-white top-0 left-0 w-full opacity-50">
      <div className="w-10 h-10 border-4 border-t-transparent border-loader-background rounded-full animate-spin !opacity-100"></div>
    </div>
  );
});

export default Loader;
