import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fry Playground",
  description: "Fry Playground",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative flex min-h-screen w-full flex-col overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  );
}
