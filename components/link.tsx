import NextLink from "next/link";

export default function Link({ href, text }: { href: string; text: string }) {
  return (
    <NextLink href={href} className="text-sm font-bold hover:opacity-50 transition-opacity">
      {text}
    </NextLink>
  );
}
