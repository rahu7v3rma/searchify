import { memo } from "react";
import TextButton from "../buttons/TextButton";

const Logo = memo(() => {
  return (
    <TextButton className="text-2xl !font-bold tracking-wider text-[#ffffff] bg-text-primary px-1 rounded-md">
      softools
    </TextButton>
  );
});

export default Logo;
