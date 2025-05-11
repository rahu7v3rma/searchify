import { useState, useRef, useEffect } from "react";
import Text from "./text";
import Spinner from "./spinner";
import EyeOnIcon from "../assets/icons/eye-on";
import EyeOffIcon from "../assets/icons/eye-off";

export function Input({ label, type, placeholder, value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col gap-2 items-start w-full">
      <Text text={label} />
      <div className="relative w-full">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          id={label}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="border-2 border-primary-border rounded-md p-2 text-sm w-full"
        />
        {type === "password" && (
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 z-10 w-4 h-4 top-1/2 -translate-y-1/2"
          >
            {showPassword ? <EyeOnIcon /> : <EyeOffIcon />}
          </button>
        )}
      </div>
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
}) {
  const [searchInput, setSearchInput] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
