import Link from "next/link";
import { TextButton } from "./button";
import { Heading1 } from "./heading";
import { paths } from "../constants/paths";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Heading1 text="We provide google search analysis tools" />
      <div className="mt-4 text-center">
        <Link href={paths.signup}>
          <TextButton text="Get started" />
        </Link>
      </div>
    </div>
  );
}
