import Carousel from "./carousel";
import Image from "next/image";

import MenuEcoImg from "../../asset/menu_eco.jpg";
import MenuHotel from "../../asset/menu_hotel.jpg";
import MenuDomAccom from "../../asset/menu_dom_accom.jpg";
import MenuIntlFlightImg from "../../asset/menu_intl_flight.jpg";
import MenuRecTourImg from "../../asset/menu_rec_tour.jpg";
import Link from "next/link";

export default function Home() {
  const menuItems = [
    
    { src: MenuHotel, alt: "hotel", label: "해외 호텔 예약", href : "/hotel" },
    { src: MenuDomAccom, alt: "accom", label: "국내 숙박시설 예약", href : "/domestic/accom" },
    { src: MenuIntlFlightImg, alt: "flight", label: "해외 항공편 예약", href : "/flight" },
    { src: MenuEcoImg, alt: "eco", label: "생태관광 정보", href : "/tourinfo/eco" },
    { src: MenuRecTourImg, alt: "recTour", label: "문화체육관광부 추천 여행지", href : "/tourinfo/rec" },
  ];

  return (
    <>
      <Carousel />
      <div className="flex min-h-screen flex-col items-center w-full">
        <div className="grid grid-cols-2 gap-32 p-4 w-1/2 mt-32">
          {menuItems.map((item, index) => (
            <Link href={item.href}>
            <div key={index} className="relative w-full rounded-3xl shadow-lg group">
              <Image
                src={item.src}
                alt={item.alt}
                className="w-full rounded-3xl"
              />
              <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-10 rounded-3xl transition-opacity duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-2xl font-bold shadow-md">
                  {item.label}
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
    </>
  );
}