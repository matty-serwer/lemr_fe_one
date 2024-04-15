import type { Metadata } from "next";
import { Inter, Nunito_Sans } from "next/font/google";
// styles
import "./globals.css";
// providers
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });
const nunito = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LEMR",
  description: "LEMR Project initial UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
