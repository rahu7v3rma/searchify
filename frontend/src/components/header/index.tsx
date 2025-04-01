import { memo } from "react";
import TextButton from "../buttons/TextButton";
const Header = memo(() => {
  return (
    <div className="bg-sky-300 px-6 py-4 flex justify-between items-center">
      <TextButton className="text-2xl !font-bold tracking-wider">
        SOFTOOLS
      </TextButton>
      <div className="flex gap-4">
        <TextButton>Login</TextButton>
        <TextButton>Signup</TextButton>
      </div>
    </div>
  );
});

export default Header;
