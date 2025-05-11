"use client";
import { useState } from "react";
import { TextButton } from "../../components/button";
import { Heading1 } from "../../components/heading";
import { Input } from "../../components/input";
import { useToast } from "../../context/toast";
import { useLoader } from "../../context/loader";
import { callApi } from "../../lib/api";
import { useUser } from "../../context/user";
import { useRouter } from "next/navigation";

export default function ChangePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailConfirmationCode, setEmailConfirmationCode] = useState("");

  const { showToast } = useToast();
  const { setLoading } = useLoader();
  const { changePasswordEmail } = useUser();
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-center flex gap-4 flex-col">
        <Heading1 text="Change Password" />
        <div className="w-[300px]">
          <Input
            label="Email confirmation code"
            type="text"
            value={emailConfirmationCode}
            onChange={(text) => setEmailConfirmationCode(text)}
          />
        </div>
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
        <TextButton
          text="Update Password"
          onClick={async () => {
            if (password !== confirmPassword) {
              showToast("Passwords do not match");
              return;
            }
            setLoading(true);
            const response = await callApi("/user/change-password", "POST", {
              email: changePasswordEmail,
              email_verification_code: emailConfirmationCode,
              password,
            });
            showToast(response.message);
            if (response.success) {
              router.push("/login");
            }
            setLoading(false);
          }}
        />
      </div>
    </div>
  );
}
