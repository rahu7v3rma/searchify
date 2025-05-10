import "./globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import LoaderProvider from "../context/loader";
import ToastProvider from "../context/toast";
import Loader from "../components/loader";
import Toast from "../components/toast";
import { ReactNode } from "react";
import Container from "../components/container";
import { UserProvider } from "../context/user";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LoaderProvider>
          <ToastProvider>
            <UserProvider>
              <Loader />
              <Toast />
              <div className="min-h-screen">
                <div className="fixed top-0 w-full">
                  <Navbar />
                </div>
                <div className="pt-16">
                  <Container>{children}</Container>
                </div>
                <div className="absolute bottom-0 w-full">
                  <Footer />
                </div>
              </div>
            </UserProvider>
          </ToastProvider>
        </LoaderProvider>
      </body>
    </html>
  );
}
