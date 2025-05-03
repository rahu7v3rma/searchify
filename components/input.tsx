import Text from "./text";

export function Input({
  label,
  type,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Text text={label} />
      <input
        type={type}
        placeholder={placeholder}
        id={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-2 border-primary-border rounded-md p-2 text-sm"
      />
    </div>
  );
}
