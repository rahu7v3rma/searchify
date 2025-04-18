import "./globals.css";
import Link from "next/link";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Softools</title>
        <meta name="description" content="SEO tools" />
      </head>
      <body>
        <div className="relative min-h-screen">
          <div className="h-[70px] shadow-md flex items-center justify-between px-10 w-full">
            <Link href="/">
              <span className="text-2xl font-bold text-gray-600 cursor-pointer hover:opacity-50">
                softools
              </span>
            </Link>
            <img
              src="/svgs/account.svg"
              alt="account"
              className="w-7 h-7 cursor-pointer hover:opacity-50"
            />
          </div>
          <div className="">{children}</div>
          <div className="h-[40px] flex items-center justify-between px-10 border-t border-gray-200 absolute bottom-0 w-full">
            <span className="text-gray-600 text-sm">
              © {new Date().getFullYear()} softools
            </span>
            <div className="flex items-center gap-4">
              <span className="cursor-pointer hover:opacity-50 text-gray-600 font-semibold text-sm">
                Contact us
              </span>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
