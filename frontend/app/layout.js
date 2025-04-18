"use client";
import {
  Avatar,
  HeroUIProvider,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Spinner,
  ToastProvider,
} from "@heroui/react";
import Link from "next/link";
import "./globals.css";
import { createContext, useState, useContext } from "react";

const LoaderContext = createContext({
  isLoading: false,
  setIsLoading: () => {},
});

export const useLoader = () => {
  return useContext(LoaderContext);
};

export default function RootLayout({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Softools</title>
        <meta name="description" content="SEO tools" />
      </head>
      <body>
        <HeroUIProvider>
          <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
            <div className="relative min-h-screen">
              <Navbar position="static">
                <NavbarBrand>
                  <Link href="/">
                    <p className="font-bold text-inherit text-2xl cursor-pointer hover:opacity-50">
                      softools
                    </p>
                  </Link>
                </NavbarBrand>
                <NavbarContent
                  className="hidden sm:flex gap-4"
                  justify="center"
                ></NavbarContent>
                <NavbarContent justify="end">
                  <NavbarItem className="hidden lg:flex">
                    <Avatar
                      showFallback
                      src="https://images.unsplash.com/broken"
                    />
                  </NavbarItem>
                </NavbarContent>
              </Navbar>
              <div className="">{children}</div>
              <div className="h-[40px] flex items-center justify-between px-10 border-t border-gray-200 absolute bottom-0 w-full">
                <span className="text-gray-600 text-sm">
                  © {new Date().getFullYear()} softools
                </span>
                <div className="flex items-center gap-4">
                  <span className="cursor-pointer hover:opacity-50 text-gray-600 font-semibold text-sm">
                    Contact us
                  </span>
                </div>
              </div>
              {isLoading && (
                <div className="flex justify-center items-center absolute w-full h-full bg-gray-100 top-0 opacity-50">
                  <Spinner size="lg" />
                </div>
              )}
              <ToastProvider />
            </div>
          </LoaderContext.Provider>
        </HeroUIProvider>
      </body>
    </html>
  );
}
