"use client";
import Link from "./link";
import Logo from "./logo";
import { useUser } from "../context/user";
import Avatar from "./avatar";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user } = useUser();
  const router = useRouter();

  return (
    <div className="w-full h-16 flex items-center px-4 justify-between border-b-[0.5px] border-primary-border">
      <Logo />
      <div className="flex items-center gap-4">
        {user ? (
          <Avatar
            text={user?.email?.slice(0, 2)}
            onClick={() => router.push("/profile")}
          />
        ) : (
          <Link href={"/login"} text="Login" />
        )}
      </div>
    </div>
  );
}
