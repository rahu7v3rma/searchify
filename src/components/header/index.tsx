import { memo } from "react";
import TextButton from "../buttons/TextButton";
import Logo from "../logo";
import Dropdown from "../dropdown";

const Header = memo(() => {
  return (
    <div className="px-6 py-4 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-10">
        <Logo />
        <Dropdown label="SEO Tools" options={["Google Keyword Tool"]} />
      </div>
      <div className="flex gap-4">
        <TextButton className="text-[18px]">Login</TextButton>
      </div>
    </div>
  );
});

export default Header;
