import Link from "next/link";
import { paths } from "../constants/paths";

export default function Logo() {
  return (
    <Link href={paths.home}>
      <span className="text-2xl font-bold hover:opacity-50 transition-opacity">searchify</span>
    </Link>
  );
}
