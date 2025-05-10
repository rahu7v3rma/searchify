import Link from "next/link";
import { TextButton } from "./button";
import { Heading1 } from "./heading";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Heading1 text="We provide google search analysis tools" />
      <div className="mt-4 text-center">
        <Link href="/google-keyword-tool">
          <TextButton text="Get started" />
        </Link>
      </div>
    </div>
  );
}
