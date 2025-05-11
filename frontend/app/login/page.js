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
import { setCookie } from "../../utils/cookie";
import { useUser } from "../../context/user";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { showToast } = useToast();
  const router = useRouter();
  const { setLoading } = useLoader();
  const { setAccessToken } = useUser();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-center flex gap-4 flex-col">
        <Heading1 text="Login" />
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
          <div className="flex justify-end mt-1">
            <Link
              href={"/forgot-password"}
              text="Forgot Password?"
              size="small"
            />
          </div>
        </div>
        <TextButton
          text="Login"
          onClick={async () => {
            setLoading(true);
            const response = await callApi("/user/login", "POST", {
              email,
              password,
            });
            showToast(response.message);
            if (response.success) {
              setAccessToken(response.data.access_token);
            }
            setLoading(false);
          }}
        />
      </div>
      <div className="flex gap-2 mt-4">
        <Text text="Don't have an account?" />
        <Link href={"/signup"} text="Signup" />
      </div>
    </div>
  );
}
