import Logo from "./logo";

export default function Navbar() {
  return (
    <div className="w-full h-16 flex items-center px-4 justify-between border-b-[0.5px] border-primary-border">
      <Logo />
    </div>
  );
}
