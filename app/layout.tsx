import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Umroo's Links",
  description: "All of Umer's faourite links with a personal touch :)",
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
