"use client";
import { memo } from "react";
import TextButton from "../buttons/TextButton";
import { useRouter } from "next/navigation";

const Logo = memo(() => {
  const router = useRouter();
  return (
    <TextButton
      className="!text-2xl !font-bold tracking-wider px-1 rounded-md !text-logo-text"
      onClick={() => router.push("/")}
    >
      softools
    </TextButton>
  );
});

export default Logo;
