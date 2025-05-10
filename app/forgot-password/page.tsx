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
import { validateEmail } from "../../utils/general";
import { paths } from "../../constants/paths";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const { showToast } = useToast();
  const router = useRouter();
  const { setLoading } = useLoader();

  const resetPassword = async () => {
    if (!validateEmail(email)) {
      showToast("Invalid email");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}${paths.changePassword}`,
      });

      if (error) throw error;

      showToast("Password reset email sent");
      router.push(paths.login);
    } catch (error) {
      showToast(error?.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-center flex gap-4 flex-col">
        <Heading1 text="Forgot Password" />
        <div className="w-[300px]">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(text) => setEmail(text)}
          />
        </div>
        <TextButton text="Reset Password" onClick={resetPassword} />
      </div>
      <div className="flex gap-2 mt-4">
        <Text text="Remember your password?" />
        <Link href={paths.login} text="Login" />
      </div>
    </div>
  );
} 