"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { callApi } from "../lib/api";
import { getCookie, removeCookie, setCookie } from "../utils/cookie";
import { usePathname, useRouter } from "next/navigation";

const userPaths = ["/dashboard", "/profile", "/google-keyword-tool"];
const publicPaths = [
  "/login",
  "/signup",
  "/forgot-password",
  "/change-password",
  "/",
];

export const UserContext = createContext({
  user: null,
  setUser: (user) => {},
  changePasswordEmail: null,
  setChangePasswordEmail: (changePasswordEmail) => {},
  accessToken: null,
  setAccessToken: (accessToken) => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [changePasswordEmail, setChangePasswordEmail] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const pathname = usePathname();
  const router = useRouter();

  const getProfile = async () => {
    const response = await callApi("/user/profile", "GET");
    if (response.success) {
      setUser(response.data);
    }
  };

  useEffect(() => {
    if (accessToken) {
      setCookie("searchify.api.access_token", accessToken);
      getProfile();
    } else {
      removeCookie("searchify.api.access_token");
    }
  }, [accessToken]);

  useEffect(() => {
    if (userPaths.includes(pathname) && !user) {
      router.push("/login");
    }
    if (publicPaths.includes(pathname) && user) {
      router.push("/dashboard");
    }
  }, [pathname, user]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        changePasswordEmail,
        setChangePasswordEmail,
        accessToken,
        setAccessToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
