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
      <script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="umroo" data-description="Support me on Buy me a coffee!" data-message="Thanks for visiting! You can buy me a coffee so I have the energy to make cool stuff for you :)" data-color="#FF5F5F" data-position="Right" data-x_margin="18" data-y_margin="18"></script>
    </html>
  );
}
