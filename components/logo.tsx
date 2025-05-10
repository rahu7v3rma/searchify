import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <span className="text-2xl font-bold hover:opacity-50 transition-opacity">searchify</span>
    </Link>
  );
}
