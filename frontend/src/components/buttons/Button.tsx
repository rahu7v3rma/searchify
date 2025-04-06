import { memo } from "react";

const Button = memo(
  ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => {
    return (
      <button
        className="bg-primary-button w-full p-2 rounded-md font-bold cursor-pointer hover:opacity-70"
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
);

export default Button;
