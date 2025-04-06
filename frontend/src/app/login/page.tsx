"use client";
import Button from "@/components/buttons/Button";
import Heading from "@/components/heading";
import Input from "@/components/input";
import { LoaderContext } from "@/context/loader";
import { ToastContext } from "@/context/toast";
import { login } from "@/utils/api";
import { useRouter } from "next/navigation";
import { memo, useCallback, useContext } from "react";
import { useForm } from "react-hook-form";

const Login = memo(() => {
  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onChange = useCallback((name: "email" | "password", value: string) => {
    setValue(name, value, { shouldValidate: true });
  }, []);

  const { openLoader, closeLoader } = useContext(LoaderContext);
  const { triggerToast } = useContext(ToastContext);
  const router = useRouter();
  const onSubmit = useCallback(
    async (formData: { email: string; password: string }) => {
      const { email, password } = formData;
      openLoader();
      const response = await login(email, password);
      closeLoader();
      if (!response.success) {
        triggerToast(response.message, "error");
        return;
      }
      triggerToast("Login successful", "success");
      router.push("/profile");
    },
    []
  );

  return (
    <div className="flex flex-col gap-4 justify-center items-center w-[300px]">
      <Heading>Login</Heading>
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
      <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
    </div>
  );
});

export default Login;
