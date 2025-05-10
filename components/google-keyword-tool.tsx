"use client";
import { useState } from "react";
import useLoader from "../hooks/loader";
import useToast from "../hooks/toast";
import { getKeywordToolSearch } from "../lib/api";
import { TextButton } from "./button";
import { Autocomplete, Input } from "./input";

export default function GoogleKeywordTool() {
  const [geotargets, setGeotargets] = useState<any[]>([]);
  const [selectedGeotarget, setSelectedGeotarget] = useState<any | null>(null);

  const { showToast } = useToast();
  const { setLoading } = useLoader();

  const search = async () => {
    setLoading(true);

    const { data, error } = await getKeywordToolSearch("hotels", "1023191");

    if (error) {
      showToast(error);
    } else {
      console.log(data);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center pt-16">
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
        <TextButton text="Search" onClick={search} />
      </div>
    </div>
  );
}
