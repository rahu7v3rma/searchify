"use client";
import GoogleKeywordTool from "@/components/google-keyword-tool";
import { LoaderContext } from "@/context/loader";
import { ToastContext } from "@/context/toast";
import { connectAPI } from "@/utils/api";
import { useContext, useEffect } from "react";

const HomePage = () => {
  const { openLoader, closeLoader } = useContext(LoaderContext);
  const { triggerToast } = useContext(ToastContext);
  useEffect(() => {
    openLoader("Connecting to API");
    connectAPI()
      .then((res) => {
        if (res.success) {
          triggerToast("API connected", "success");
        } else {
          triggerToast("API connection failed", "error");
        }
      })
      .finally(() => {
        closeLoader();
      });
  }, []);
  return (
    <div className="p-10">
      <GoogleKeywordTool />
    </div>
  );
};

export default HomePage;
