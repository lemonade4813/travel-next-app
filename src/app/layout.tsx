import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import NavLink from "./navLink";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

const menuData = [

  {id : 'menu01', name : 'Home', path : '/home'},
  {id : 'menu02', name : '호텔 예약', path : '/hotel'}, 
  {id : 'menu03', name : '항공편 예약', path : '/flight'},
  {id : 'menu04', name : '국내 숙박업소 예약', path : '/domestic/accom'}
]



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="ko">
      <head>
        <Script type="text/javascript"
                src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=0c9800fcf2fe90b7dbc10f3cb1e562ed&autoload=false&libraries=services`}
                strategy="beforeInteractive"
        />
      </head>
      <body>
        <header className="flex items-center justify-around h-16">
          <h1 className="font-['GochiHand'] text-2xl text-red-800">Bon Voyage</h1>
          <div className="flex gap-4">
            <Link href="/login" className="border-r-2 border-sky-300 pr-[16px]">로그인</Link>
            <Link href="/signup">회원가입</Link>
          </div>
        </header>
        <nav className="flex items-center justify-center shadow-xl">
          {menuData.map((menu) => 
              <NavLink href={menu.path} key={menu.id}>
                {menu.name}
              </NavLink>
          )}
        </nav>
        <section>
        {children}
        </section>
      </body>
    </html>
  );
}
