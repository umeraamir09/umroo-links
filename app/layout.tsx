import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Umroo's Links",
  description: "All of my social links in one place!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-SpecialElite antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
