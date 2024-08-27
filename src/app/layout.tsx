import "./globals.css";
import Link from "next/link";
import NavLink from "./NavLink";
import Script from "next/script";


const menuData = [

  {id : 'menu01', name : 'Home', path : '/home'},
  {
    id: 'menu02', name: '호텔 / 숙소', path : '/domestic/accom',
    subMenu: [
      { name: '국내 숙소', path: '/domestic/accom' },
      { name: '해외 호텔', path: '/hotel' },
    ]
  },
  {
    id: 'menu03', name: '항공편', path : '/flight',
    subMenu: [
      { name: '해외', path: '/flight' },
    ]
  },
  {
    id: 'menu04', name: '관광정보', path : '/tourinfo/eco',
    subMenu: [
      { name: '생태 관광', path: '/tourinfo/eco' },
    ]
  },
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
            <NavLink href={menu.path} key={menu.id} subMenu={menu.subMenu}>
              {menu.name}
            </NavLink>
          )}
        </nav>
        <section className="flex justify-center items-center">
          {children}
        </section>
      </body>
    </html>
  );
}
