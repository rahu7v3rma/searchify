import { ReactNode } from "react";
import Loader from "../components/loader";
import RootLayout from "../components/root-layout";
import Toast from "../components/toast";
import LoaderProvider from "../context/loader";
import ToastProvider from "../context/toast";
import { UserProvider } from "../context/user";
import "./globals.css";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LoaderProvider>
          <ToastProvider>
            <UserProvider>
              <Loader />
              <Toast />
              <RootLayout>{children}</RootLayout>
            </UserProvider>
          </ToastProvider>
        </LoaderProvider>
      </body>
    </html>
  );
}
