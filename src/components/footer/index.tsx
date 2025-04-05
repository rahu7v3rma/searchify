import { memo } from "react";
import TextButton from "../buttons/TextButton";
import { getCurrentYear } from "../../utils/date";

const Footer = memo(() => {
  return (
    <div className="px-6 py-2 flex justify-between items-center sm:flex-row flex-col-reverse gap-4 sm:gap-0 w-full border-t-[0.5px] border-primary-border-color">
      <span className="text-sm">Copyright © {getCurrentYear()} softools</span>
      <div className="flex gap-4">
        <TextButton>About</TextButton>
        <TextButton>Contact</TextButton>
        <TextButton>Terms</TextButton>
        <TextButton>Privacy</TextButton>
      </div>
    </div>
  );
});

export default Footer;
