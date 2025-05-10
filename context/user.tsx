"use client";
import { createContext, useEffect, useState } from "react";
import useLoader from "../hooks/loader";
import useToast from "../hooks/toast";
import supabase from "../lib/supabase";
import { setCookie } from "../utils/cookie";
import { User } from "../utils/types";

export const UserContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
}>({
  user: null,
  setUser: (user: User | null) => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const { setLoading } = useLoader();
  const { showToast } = useToast();

  const getSession = async () => {
    setLoading(true);

    const { data, error } = await supabase.auth.getSession();
    if (error) {
      showToast(error?.message || "Failed to get session");
      setLoading(false);
      return;
    }

    setCookie(
      process.env.NEXT_PUBLIC_USER_ACCESS_TOKEN_KEY!,
      data.session?.access_token
    );

    setLoading(false);
  };

  const getUser = async () => {
    setLoading(true);

    const { data, error } = await supabase.auth.getUser();
    if (error) {
      showToast(error?.message || "Failed to get user");
      setLoading(false);
      return;
    }

    setUser({
      id: data.user.id,
      email: data.user.email,
    });

    showToast("User fetched successfully");

    setLoading(false);
  };

  useEffect(() => {
    getUser();
    getSession();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
