import Link from "next/link";
import { TextButton } from "./button";
import { Heading1 } from "./heading";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Heading1 text="We provide google search analysis tools" />
      <div className="mt-8 text-center">
        <Heading1 text="Tools offered by us" />
        <div className="mt-2">
          <Link href="/google-keyword-tool">
            <TextButton text="Google Keyword Tool" />
          </Link>
        </div>
      </div>
    </div>
  );
}
