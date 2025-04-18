"use client";
import { Button, Input } from "@heroui/react";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center mt-10">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-2xl font-bold">Register</h1>
        <Input label="Email" type="email" className="w-[300px]" />
        <Input label="Password" type="password" className="w-[300px]" />
        <Button>Submit</Button>
      </div>
    </div>
  );
}
