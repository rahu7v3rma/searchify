import "./globals.css";

export const metadata = {
  title: "Softools",
  description: "SEO tools",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
