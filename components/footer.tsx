import Link from "./link";
import Copyright from "./copyright";

export default function Footer() {
  return (
    <div className="w-full h-10 flex items-center px-4 border-t-[0.5px] border-primary-border justify-between">
      <Copyright />
      <div className="flex items-center gap-4">
        <Link href="/contact" text="Contact Us" />
        <Link href="/privacy" text="Privacy Policy" />
      </div>
    </div>
  );
}

