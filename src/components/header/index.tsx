import { memo } from "react";
import TextButton from "../buttons/TextButton";
import Logo from "../logo";
import Dropdown from "../dropdown";

const Header = memo(() => {
  return (
    <div className="bg-primary-background px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-10">
        <Logo />
        <Dropdown
          label="SEO Tools"
          options={[
            "Keyword Tool",
            "SERP Tool",
            "Ranking Tool",
            "Competitor Tool",
            "Backlink Tool",
            "Content Tool",
          ]}
        />
      </div>
      <div className="flex gap-4">
        <TextButton className="text-[18px]">Login</TextButton>
        <TextButton className="text-[18px]">Signup</TextButton>
      </div>
    </div>
  );
});

export default Header;
