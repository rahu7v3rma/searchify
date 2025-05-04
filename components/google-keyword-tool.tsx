"use client";
import { TextButton } from "./button";
import { Heading1 } from "./heading";
import { Autocomplete, Input } from "./input";
import { Geotarget } from "../utils/mongoose";
import { useState } from "react";
import useApi from "../hooks/api";
import { debounceAsync } from "../utils/general";

export default function GoogleKeywordTool() {
  const [geotargets, setGeotargets] = useState<Geotarget[]>([]);
  const [selectedGeotarget, setSelectedGeotarget] = useState<Geotarget | null>(
    null
  );

  const { loading: getGeotargetsLoading, request: getGeotargets } = useApi<
    Geotarget[]
  >({
    url: "/google-keyword-tool/geotarget",
    method: "POST",
  });

  const debouncedGetGeotargets = debounceAsync<typeof getGeotargets>(
    getGeotargets,
    1000
  );

  return (
    <div className="flex flex-col items-center justify-center pt-16">
      <Heading1 text="Google Keyword Tool" />
      <div className="flex flex-row gap-4 items-end mt-6">
        <div className="w-[300px]">
          <Input label="Enter a keyword" />
        </div>
        <div className="w-[300px]">
          <Autocomplete
            loading={getGeotargetsLoading}
            label="Select a location"
            options={geotargets?.map((geotarget) => ({
              id: geotarget._id,
              name: geotarget.canonicalName,
            }))}
            value={{
              id: selectedGeotarget?._id || "",
              name: selectedGeotarget?.canonicalName || "",
            }}
            onInputChange={(value) => {
              debouncedGetGeotargets({ canonicalName: value }).then(
                (response) => {
                  if (response.success && response.data) {
                    console.log("response", response);
                    setGeotargets(response.data);
                  }
                }
              );
            }}
            onChange={(value) => {
              const foundGeotarget = geotargets.find(
                (geotarget) => geotarget.canonicalName === value.name
              );
              if (foundGeotarget) {
                setSelectedGeotarget(foundGeotarget);
              }
            }}
          />
        </div>
        <TextButton text="Search" />
      </div>
    </div>
  );
}
