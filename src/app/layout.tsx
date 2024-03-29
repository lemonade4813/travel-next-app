"use client"

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

const menuData = [

  {id : 'menu01', name : 'Home', path : '/'},
  {id : 'menu02', name : '호텔 예약', path : '/hotel'}, 
  {id : 'menu03', name : '항공편 예약', path : '/flight'},
]



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const pathname = usePathname();


  return (
    <html lang="en">
      <body>
        <header className="flex items-center justify-center h-16  gap-96">
          <h1 className="font-['GochiHand'] text-2xl text-red-800">Bon Voyage</h1>
          <div className="flex gap-4">
            <p>로그인</p>
            <p>회원가입</p>
          </div>
        </header>
        <nav className="flex items-center justify-center gap-60 bg-orange-200 h-16">
          {menuData.map((menu) => 
            <div key={menu.id} className={`relative flex-1 ${pathname === menu.path ? 'bg-yellow-600' : ''}`}>
              <Link href={menu.path} className="block w-full h-full p-4 text-center">
                {menu.name}
              </Link>
            </div>
          )}
        </nav>
        <section>
        {children}
        </section>
      </body>
    </html>
  );
}
