import NextLink from "next/link";

export default function Link({
  href,
  text,
  size = "regular",
}: {
  href: string;
  text: string;
  size?: "regular" | "small";
}) {
  const sizeClass = size === "small" ? "text-xs" : "text-sm";
  const fontWeightClass = size === "small" ? "font-semibold" : "font-bold";
  return (
    <NextLink
      href={href}
      className={`${sizeClass} ${fontWeightClass} hover:opacity-50 transition-opacity`}
    >
      {text}
    </NextLink>
  );
}
