"use client";
import { memo, useCallback } from "react";
import Button from "../buttons/Button";
import Heading from "../heading";
import Input from "../input";
import { useForm } from "react-hook-form";

const GoogleKeywordTool = memo(() => {
  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      keyword: "",
      country: "",
    },
    mode: "onChange",
  });

  const onSubmit = useCallback(
    async (formData: { keyword: string; country: string }) => {},
    []
  );

  return (
    <div className="flex flex-col gap-4">
      <Heading type="h1">Google Keyword Tool</Heading>
      <Input
        placeholder="Enter a keyword"
        value={watch("keyword")}
        onChange={(e) => setValue("keyword", e.target.value)}
      />
      <Input
        placeholder="Select a country"
        value={watch("country")}
        onChange={(e) => setValue("country", e.target.value)}
      />
      <Button>Find Keywords</Button>
    </div>
  );
});

export default GoogleKeywordTool;
