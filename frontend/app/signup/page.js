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

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { showToast } = useToast();
  const router = useRouter();
  const { setLoading } = useLoader();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-center flex gap-4 flex-col">
        <Heading1 text="Signup" />
        <div className="w-[300px]">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(text) => setEmail(text)}
          />
        </div>
        <div className="w-[300px]">
          <Input
            label="Password"
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
          text="Signup"
          onClick={async () => {
            setLoading(true);
            const response = await callApi("/user/register", "POST", {
              email,
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
      <div className="flex gap-2 mt-4">
        <Text text="Already have an account?" />
        <Link href={"/login"} text="Login" />
      </div>
    </div>
  );
}
