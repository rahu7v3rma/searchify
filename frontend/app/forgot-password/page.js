"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TextButton } from "../../components/button";
import { Heading1 } from "../../components/heading";
import { Input } from "../../components/input";
import Link from "../../components/link";
import Text from "../../components/text";
import { useLoader } from "../../context/loader";
import { useToast } from "../../context/toast";
import { callApi } from "../../lib/api";
import { useUser } from "../../context/user";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const { showToast } = useToast();
  const router = useRouter();
  const { setLoading } = useLoader();
  const { setChangePasswordEmail } = useUser();

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
        <TextButton
          text="Reset Password"
          onClick={async () => {
            setLoading(true);
            const response = await callApi("/user/forgot-password", "POST", {
              email,
            });
            showToast(response.message);
            if (response.success) {
              setChangePasswordEmail(email);
              router.push("/change-password");
            }
            setLoading(false);
          }}
        />
      </div>
      <div className="flex gap-2 mt-4">
        <Text text="Remember your password?" />
        <Link href={"/login"} text="Login" />
      </div>
    </div>
  );
}
