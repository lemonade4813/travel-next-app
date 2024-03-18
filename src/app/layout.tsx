import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <h1>Bon Voyage</h1>
        </header>
        <nav>
          <Link href ="/">홈</Link>
          <Link href ="/hotel">호텔예약</Link>
          <Link href ="/flight">항공편예약</Link>
        </nav>
        <section>
        {children}
        </section>
      </body>
    </html>
  );
}
