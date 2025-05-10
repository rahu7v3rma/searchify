"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Heading1 } from "../../components/heading";
import { Input } from "../../components/input";
import { TextButton } from "../../components/button";
import Text from "../../components/text";
import Link from "../../components/link";
import useLoader from "../../hooks/loader";
import useToast from "../../hooks/toast";
import supabase from "../../lib/supabase";
import { validatePassword } from "../../utils/general";
import { paths } from "../../constants/paths";

export default function ChangePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { showToast } = useToast();
  const router = useRouter();
  const { setLoading } = useLoader();

  const updatePassword = async () => {
    if (!validatePassword(password)) {
      showToast(
        "Password must be of length 8 characters and contain a number, special character, uppercase letter, and lowercase letter"
      );
      return;
    }

    if (password !== confirmPassword) {
      showToast("Passwords do not match");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      showToast(error?.message || "Failed to update password");
      setLoading(false);
      return;
    }

    showToast("Password updated successfully");

    router.push(paths.dashboard);

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-center flex gap-4 flex-col">
        <Heading1 text="Change Password" />
        <div className="w-[300px]">
          <Input
            label="New Password"
            type="password"
            value={password}
            onChange={(text) => setPassword(text)}
          />
        </div>
        <div className="w-[300px]">
          <Input
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(text) => setConfirmPassword(text)}
          />
        </div>
        <TextButton text="Update Password" onClick={updatePassword} />
      </div>
    </div>
  );
}
