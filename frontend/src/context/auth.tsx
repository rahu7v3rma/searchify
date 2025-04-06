"use client";

import { getProfile as apiGetProfile } from "@/utils/api";
import { AuthContextType, User } from "@/utils/types";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<AuthContextType>({
  user: null,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    apiGetProfile().then((response) => {
      console.log(response);
      if (response.success) {
        setUser(response.data);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
