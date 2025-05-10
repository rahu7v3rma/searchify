"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TextButton } from "../../components/button";
import { Heading1 } from "../../components/heading";
import { Input } from "../../components/input";
import Link from "../../components/link";
import Text from "../../components/text";
import useLoader from "../../hooks/loader";
import useToast from "../../hooks/toast";
import useUser from "../../hooks/user";
import supabase from "../../lib/supabase";
import { validateEmail, validatePassword } from "../../utils/general";
import { setCookie } from "../../utils/cookie";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { showToast } = useToast();
  const router = useRouter();
  const { setUser } = useUser();
  const { setLoading } = useLoader();

  const signup = async () => {
    if (!validateEmail(email)) {
      showToast("Invalid email");
      return;
    }

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

    try {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      showToast("Signup successful");

      const user = {
        email,
        id: data.user?.id,
      };

      setUser(user);

      setCookie(process.env.NEXT_PUBLIC_USER_COOKIE_KEY!, JSON.stringify(user));

      router.push("/profile");
    } catch (error) {
      showToast(error?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

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
        <TextButton text="Signup" onClick={signup} />
      </div>
      <div className="flex gap-2 mt-4">
        <Text text="Already have an account?" />
        <Link href="/login" text="Login" />
      </div>
    </div>
  );
}
