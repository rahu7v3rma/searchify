"use client";
import Button from "@/components/buttons/Button";
import Heading from "@/components/heading";
import Input from "@/components/input";
import { AuthContext } from "@/context/auth";
import { LoaderContext } from "@/context/loader";
import { ToastContext } from "@/context/toast";
import { signup } from "@/utils/api";
import { useRouter } from "next/navigation";
import { memo, useCallback, useContext } from "react";
import { useForm } from "react-hook-form";

const Signup = memo(() => {
  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onChange = useCallback(
    (
      name: "name" | "email" | "password" | "confirmPassword",
      value: string
    ) => {
      setValue(name, value, { shouldValidate: true });
    },
    []
  );

  const { openLoader, closeLoader } = useContext(LoaderContext);
  const { triggerToast } = useContext(ToastContext);
  const router = useRouter();

  const onSubmit = useCallback(
    async (formData: {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    }) => {
      const { name, email, password, confirmPassword } = formData;
      openLoader();
      const response = await signup(name, email, password, confirmPassword);
      closeLoader();
      if (!response.success) {
        triggerToast(response.message, "error");
        return;
      }
      triggerToast("Signup successful", "success");
      router.push("/login");
    },
    []
  );

  return (
    <div className="flex flex-col gap-4 justify-center items-center w-[300px]">
      <Heading>Signup</Heading>
      <Input
        type="text"
        placeholder="Name"
        errorMessage={errors.name?.message}
        value={watch("name")}
        onChange={(e) => onChange("name", e.target.value)}
      />
      <Input
        type="text"
        placeholder="Email"
        errorMessage={errors.email?.message}
        value={watch("email")}
        onChange={(e) => onChange("email", e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        errorMessage={errors.password?.message}
        value={watch("password")}
        onChange={(e) => onChange("password", e.target.value)}
      />
      <Input
        type="password"
        placeholder="Confirm Password"
        errorMessage={errors.confirmPassword?.message}
        value={watch("confirmPassword")}
        onChange={(e) => onChange("confirmPassword", e.target.value)}
      />
      <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
    </div>
  );
});

export default Signup;
