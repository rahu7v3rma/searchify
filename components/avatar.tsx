"use client";

export default function Avatar({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <div
      className="w-8 h-8 rounded-full bg-avatar-background flex items-center justify-center cursor-pointer hover:opacity-50 transition-opacity"
      onClick={onClick}
    >
      <span className="text-sm !text-avatar-text">{text}</span>
    </div>
  );
}
