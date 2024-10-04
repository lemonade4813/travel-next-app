"use client"

import Image from "next/image";
import HambergerMenuSvg from "@/asset/hamburger_menu.svg"
import { usePathname } from "next/navigation";
import NavLink from "./NavLink";

const menuData = [
  {
    id: 'menu02', name: '호텔 / 숙소 예약', path: '/domestic/accom',
    subMenu: [
      { name: '국내 숙소', path: '/domestic/accom' },
      { name: '해외 호텔', path: '/hotel' },
    ]
  },
  {
    id: 'menu03', name: '항공편 예약', path: '/flight',
    subMenu: [
      { name: '해외 항공편', path: '/flight' },
    ]
  },
  {
    id: 'menu04', name: '관광정보', path: '/tourinfo/eco',
    subMenu: [
      { name: '생태 관광', path: '/tourinfo/eco' },
      { name: '문화체육관광부 추천 관광지', path: '/tourinfo/rec' },
    ]
  },
]

export default function MainNav() {

  const pathname = usePathname();

  return (
    <nav className={`flex h-16 sm:flex-row sm:w-full items-center justify-around bg-blue-600 shadow-lg relative 
                    ${(pathname === '/home' ||
                       pathname === '/login' ||
                       pathname === '/signup' ? 'hidden' : 'block')}`}>
      <Image src={HambergerMenuSvg}
        width={40}
        height={40}
        alt="hamberger menu"
        className={`cursor-pointer sm:hidden`}
      />
      {menuData.map((menu) =>
        <div className="hidden sm:block">
            <NavLink href={menu.path} key={menu.id} subMenu={menu.subMenu}>
                {menu.name}
            </NavLink>
        </div>
      )}
    </nav>
  )
}