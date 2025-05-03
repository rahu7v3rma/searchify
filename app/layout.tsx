import "./globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import LoaderProvider from "../context/loader";
import ToastProvider from "../context/toast";
import Loader from "../components/loader";
import Toast from "../components/toast";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LoaderProvider>
          <ToastProvider>
            <Loader />
            <Toast />
            <div className="min-h-screen">
              <div className="fixed top-0 w-full">
                <Navbar />
              </div>
              <div className="pt-16">{children}</div>
              <div className="absolute bottom-0 w-full">
                <Footer />
              </div>
            </div>
          </ToastProvider>
        </LoaderProvider>
      </body>
    </html>
  );
}
