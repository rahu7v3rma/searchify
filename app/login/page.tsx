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
import useUser from "../../hooks/user";
import supabase from "../../lib/supabase";
import { validateEmail } from "../../utils/general";
import { setCookie } from "../../utils/cookie";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { showToast } = useToast();
  const router = useRouter();
  const { setUser } = useUser();
  const { setLoading } = useLoader();

  const login = async () => {
    if (!validateEmail(email)) {
      showToast("Invalid email");
      return;
    }

    if (!password) {
      showToast("Password is required");
      return;
    }

    setLoading(true);

    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      showToast("Login successful");

      const user = {
        email,
        id: data.user?.id,
      };

      setUser(user);

      setCookie(process.env.NEXT_PUBLIC_USER_COOKIE_KEY!, JSON.stringify(user));

      router.push("/profile");
    } catch (error) {
      showToast(error?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

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
        </div>
        <TextButton text="Login" onClick={login} />
      </div>
      <div className="flex gap-2 mt-4">
        <Text text="Don't have an account?" />
        <Link href="/signup" text="Signup" />
      </div>
    </div>
  );
}
