import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Softools</title>
        <meta name="description" content="SEO tools" />
      </head>
      <body className="relative">
        <div className="h-[70px] shadow-md flex items-center justify-center">
          <span className="text-2xl font-bold">Softools</span>
        </div>
        <div>{children}</div>
      </body>
    </html>
  );
}
