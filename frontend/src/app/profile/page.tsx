"use client";
import { memo, useCallback, useContext } from "react";
import { AuthContext } from "@/context/auth";
import Button from "@/components/buttons/Button";
import Text from "@/components/text";
import { useRouter } from "next/navigation";
import { LoaderContext } from "@/context/loader";
import { ToastContext } from "@/context/toast";
import { removeAuthToken } from "@/utils/localStorage";
const Profile = memo(() => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const { openLoader, closeLoader } = useContext(LoaderContext);
  const { triggerToast } = useContext(ToastContext);
  const logout = useCallback(async () => {
    openLoader();
    removeAuthToken();
    triggerToast("Logout successful", "success");
    router.push("/login");
    closeLoader();
  }, []);
  return (
    <div>
      <Text>{user?.email}</Text>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
});

export default Profile;
