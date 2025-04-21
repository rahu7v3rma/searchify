"use client";
import { Button, Input, Textarea } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useApi } from "../../utils/api";
import { ContactUsSchema } from "../../utils/formsSchema";

export default function ContactUsPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ContactUsSchema),
  });

  const contactUsApi = useApi({
    url: "/admin/contact-us",
    method: "POST",
    isFormData: true,
  });

  const onSubmit = (data: z.infer<typeof ContactUsSchema>) => {
    const requestData = {
      email: data.email,
      message: data.message,
      attachment: undefined,
    };
    if (data.attachment) {
      requestData.attachment = data.attachment[0];
    }
    console.log(requestData);
    contactUsApi(requestData);
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-2xl font-bold">Contact Us</h1>
        <Input
          label="Email"
          type="text"
          className="w-[300px]"
          {...register("email")}
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
        />
        <Textarea
          label="Message"
          className="w-[300px]"
          {...register("message")}
          isInvalid={!!errors.message}
          errorMessage={errors.message?.message}
        />
        <Input
          label="Attachment"
          type="file"
          className="w-[300px]"
          {...register("attachment")}
          isInvalid={!!errors.attachment}
          errorMessage={errors.attachment?.message}
          accept="image/png"
          multiple={false}
        />
        <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
      </div>
    </div>
  );
}
