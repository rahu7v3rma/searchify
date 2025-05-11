"use client";

import Footer from "./footer";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { useUser } from "../context/user";

export default function RootLayout({ children }) {
  const { user } = useUser();

  return (
    <div className="min-h-screen">
      <div className="fixed top-0 w-full">
        <Navbar />
      </div>
      <div className="pt-16 h-screen flex">
        {user && <Sidebar />}
        <div
          className={`p-8 ${
            user ? "border border-primary-border" : ""
          } mb-12 mt-2 ml-4 flex-1 mr-4 rounded-md`}
        >
          {children}
        </div>
      </div>
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
}
