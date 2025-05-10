"use client";
import { createContext, useEffect, useState } from "react";
import { User } from "../utils/types";
import supabase from "../lib/supabase";
import useLoader from "../hooks/loader";
import useToast from "../hooks/toast";
import { getCookie, setCookie, removeCookie } from "../utils/cookie";
import { useRouter } from "next/navigation";
import { paths } from "../constants/paths";

export const UserContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}>({
  user: null,
  setUser: (user: User | null) => {},
  logout: () => {},
  refreshUser: async () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const { setLoading } = useLoader();
  const { showToast } = useToast();
  const router = useRouter();

  const refreshUser = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;

      if (data.user) {
        const userData = {
          id: data.user.id,
          email: data.user.email,
        };
        setUser(userData);
        setCookie(
          process.env.NEXT_PUBLIC_USER_COOKIE_KEY!,
          JSON.stringify(userData)
        );
      }
    } catch (error) {
      showToast(error?.message || "Failed to refresh user");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
      removeCookie(process.env.NEXT_PUBLIC_USER_COOKIE_KEY!);
      showToast("Logged out successfully");
      router.push(paths.login);
    } catch (error) {
      showToast(error?.message || "Failed to logout");
    } finally {
      setLoading(false);
    }
  };

  const getUser = async () => {
    setLoading(true);
    try {
      const cookieUser = getCookie(process.env.NEXT_PUBLIC_USER_COOKIE_KEY!);
      if (cookieUser) {
        const parsedUser = JSON.parse(cookieUser);
        setUser(parsedUser);
        return;
      }

      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;

      if (data.user) {
        const userData = {
          id: data.user.id,
          email: data.user.email,
        };
        setUser(userData);
        setCookie(
          process.env.NEXT_PUBLIC_USER_COOKIE_KEY!,
          JSON.stringify(userData)
        );
        showToast("User fetched successfully");
      }
    } catch (error) {
      showToast(error?.message || "Failed to get user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, logout, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};
