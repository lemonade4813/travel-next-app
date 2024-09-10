import Carousel from "./carousel";
import Image from "next/image";

import MenuEcoImg from "../../asset/menu_eco.jpg";
import MenuHotel from "../../asset/menu_hotel.jpg";
import MenuDomAccom from "../../asset/menu_dom_accom.jpg";
import MenuIntlFlightImg from "../../asset/menu_intl_flight.jpg";
import MenuRecTourImg from "../../asset/menu_rec_tour.jpg";
import AirplaneSvg from "../../asset/home/airplane.svg";
import HotelSvg from "../../asset/home/hotel.svg";
import InfoSvg from "../../asset/home/info.svg";
import Link from "next/link";

const menuList = [
  {
    mainMenuType: 'accom',
    mainMenuName: '호텔 / 숙박',
    mainMenuSvg : HotelSvg,
    items: [
      { imgSrc: MenuHotel, alt: "hotel", subMenu: "해외 호텔 예약", href: "/hotel" },
      { imgSrc: MenuDomAccom, alt: "accom", subMenu: "국내 숙박시설 예약", href: "/domestic/accom" }
    ],
  },
  {
    mainMenuType: 'flight',
    mainMenuName: '항공편',
    mainMenuSvg : AirplaneSvg,
    items: [
      { imgSrc: MenuIntlFlightImg, alt: "flight", subMenu: "해외 항공편 예약", href: "/flight" }
    ]
  },
  {
    mainMenuType: 'tourInfo',
    mainMenuName: '관광정보',
    mainMenuSvg : InfoSvg,
    items: [
      { imgSrc: MenuEcoImg, alt: "eco", subMenu: "생태관광 정보", href: "/tourinfo/eco" },
      { imgSrc: MenuRecTourImg, alt: "recTour", subMenu: "문화체육관광부 추천 여행지", href: "/tourinfo/rec" }
    ]
  },
];

export default function Home() {
  
  return (
    <div className="flex flex-col">
      <Carousel />
      <div className="flex min-h-screen flex-col items-center w-full">
        <div className="p-4 mt-32">
          {menuList.map((menu, menuIndex) => (
            <div key={menuIndex} className="mb-16">
              <div className="flex items-center gap-6 mb-8">
                <Image width ={30} height={30} src={menu.mainMenuSvg} alt="main menu image"/>
                <h2 className="text-3xl font-bold">{menu.mainMenuName}</h2>
              </div>
              <div className="flex space-x-32">
                {menu.items.map((item, itemIndex) => (
                  <Link href={item.href} key={itemIndex}>
                    <div className="relative w-80 rounded-3xl shadow-lg group flex-shrink-0">
                      <Image
                        src={item.imgSrc}
                        alt={item.alt}
                        className="w-full rounded-3xl"
                        layout="responsive"
                      />
                      <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-10 rounded-3xl transition-opacity duration-300"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white text-xl font-bold shadow-md">
                          {item.subMenu}
                        </span>
                      </div>
                      <div className="absolute inset-y-0 right-4 flex items-center justify-center">
                        <div className="bg-white bg-opacity-50 w-8 h-8 flex items-center justify-center rounded-full">
                          <span className="text-black text-xl font-bold shadow-md">
                            &gt;
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}