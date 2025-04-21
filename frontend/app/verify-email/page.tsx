"use client";
import { Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useApi } from "../../utils/api";
import { useRouter } from "next/navigation";
import { VerifyEmailSchema } from "../../utils/formsSchema";
export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(VerifyEmailSchema),
  });

  const verifyEmailApi = useApi({
    url: "/user/verify-email",
    method: "POST",
  });

  const router = useRouter();

  const onSubmit = (data: z.infer<typeof VerifyEmailSchema>) => {
    verifyEmailApi(data).then(() => {
      router.push("/login");
    });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="heading-1">Verify Email</h1>
        <Input
          label="Email"
          type="text"
          className="w-[300px]"
          {...register("email")}
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
        />
        <Input
          label="Email Verification Code"
          type="text"
          className="w-[300px]"
          {...register("emailVerificationCode")}
          isInvalid={!!errors.emailVerificationCode}
          errorMessage={errors.emailVerificationCode?.message}
        />
        <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
      </div>
    </div>
  );
}
