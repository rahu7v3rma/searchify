"use client";
import { useState } from "react";
import { TextButton } from "./button";
import { Heading1 } from "./heading";
import { Autocomplete, Input } from "./input";

export default function GoogleKeywordTool() {
  const [geotargets, setGeotargets] = useState<any[]>([]);
  const [selectedGeotarget, setSelectedGeotarget] = useState<any | null>(null);

  return (
    <div className="flex flex-col items-center justify-center pt-16">
      <Heading1 text="Google Keyword Tool" />
      <div className="flex flex-row gap-4 items-end mt-6">
        <div className="w-[300px]">
          <Input label="Enter a keyword" />
        </div>
        <div className="w-[300px]">
          <Autocomplete
            label="Select a location"
            options={geotargets?.map((geotarget) => ({
              id: geotarget._id,
              name: geotarget.canonicalName,
            }))}
            value={{
              id: selectedGeotarget?._id || "",
              name: selectedGeotarget?.canonicalName || "",
            }}
            onInputChange={(value) => {}}
            onChange={(value) => {}}
          />
        </div>
        <TextButton text="Search" />
      </div>
    </div>
  );
}
