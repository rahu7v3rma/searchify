import { useState, useRef, useEffect } from "react";
import Text from "./text";
import Spinner from "./spinner";

export function Input({
  label,
  type,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (text: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Text text={label} />
      <input
        type={type}
        placeholder={placeholder}
        id={label}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="border-2 border-primary-border rounded-md p-2 text-sm"
      />
    </div>
  );
}

export function Autocomplete({
  label,
  placeholder,
  options,
  value,
  onChange,
  loading,
  onInputChange,
}: {
  label: string;
  placeholder?: string;
  options: {
    id: string;
    name: string;
  }[];
  value: {
    id: string;
    name: string;
  };
  onChange: (value: { id: string; name: string }) => void;
  loading?: boolean;
  onInputChange?: (value: string) => void;
}) {
  const [searchInput, setSearchInput] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col gap-2 relative" ref={dropdownRef}>
      <Text text={label} />
      <input
        autoComplete="off"
        type="text"
        placeholder={placeholder}
        id={label}
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
          onInputChange?.(e.target.value);
          setIsDropdownOpen(!!e.target.value.length);
        }}
        className="border-2 border-primary-border rounded-md p-2 text-sm"
      />
      {isDropdownOpen && (
        <div className="flex flex-col gap-1 bg-primary-dropdown-background rounded-md p-2 absolute top-full mt-2 w-[300px]">
          {loading && (
            <div className="flex justify-center items-center">
              <Spinner />
            </div>
          )}
          {options.map((option) => (
            <div
              key={option.id}
              onClick={() => {
                onChange(option);
                setSearchInput(option.name);
                setIsDropdownOpen(false);
              }}
              className="flex flex-row gap-2 hover:bg-primary-dropdown-hover-background rounded-md p-2 cursor-pointer"
            >
              <Text text={option.name} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
