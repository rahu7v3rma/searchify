import { memo } from "react";

const Button = memo(
  ({
    children,
    onClick,
    className,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
  }) => {
    return (
      <button
        className={`bg-primary-button w-full p-2 rounded-md font-bold cursor-pointer hover:opacity-70 ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
);

export default Button;
