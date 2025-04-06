import { memo } from "react";
import Text from "../text";

const Input = memo(
  ({
    type,
    placeholder,
    value,
    onChange,
    className,
    errorMessage,
  }: {
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    errorMessage?: string;
  }) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        <input
          type={type}
          placeholder={placeholder}
          className={`text-sm border-[1px] border-border-light rounded-md p-2 ${className}`}
          value={value}
          onChange={onChange}
        />
        {errorMessage && (
          <Text className="!text-red-500 !text-xs">{errorMessage}</Text>
        )}
      </div>
    );
  }
);

export default Input;
