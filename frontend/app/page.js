import Link from "next/link";
import { TextButton } from "../components/button";
import { Heading1 } from "../components/heading";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Heading1 text="We provide google search analysis tools" />
      <div className="mt-4 text-center">
        <Link href={"/signup"}>
          <TextButton text="Get started" />
        </Link>
      </div>
    </div>
  );
}
