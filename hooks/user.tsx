import { useContext } from "react";
import { UserContext } from "../context/user";

export default function useUser() {
  const { user, setUser, logout, refreshUser } = useContext(UserContext);

  return { user, setUser, logout, refreshUser };
}
