import { memo } from "react";
import TextButton from "../buttons/TextButton";

const Logo = memo(() => {
  return (
    <TextButton className="text-2xl !font-bold tracking-wider px-1 rounded-md !text-logo-text">
      softools
    </TextButton>
  );
});

export default Logo;
