"use client";
import { useRouter } from "next/navigation";

export default function Avatar({ text }: { text: string }) {
  const router = useRouter();
  
  const handleClick = () => {
    router.push("/profile");
  };
  
  return (
    <div 
      className="w-8 h-8 rounded-full bg-secondary-background flex items-center justify-center cursor-pointer hover:opacity-50 transition-opacity"
      onClick={handleClick}
    >
      <span className="text-sm !text-secondary-text">{text}</span>
    </div>
  );
}
