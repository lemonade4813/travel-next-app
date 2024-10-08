"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { hotelListQueryOptions } from "./_options/hotelListQueryOptions";
import Loading from "@/util/components/Loading";
import ErrorPage from "@/util/components/Error";
import { useRouter } from "next/navigation";
import Image from "next/image";
import HotelSvg from "@/asset/home/hotel.svg"

export default function HotelList() {
  const router = useRouter();
  const { data: hotelList, isPending, error, refetch } = useSuspenseQuery(hotelListQueryOptions());

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage refetch={refetch} errorMsg={error.message} />;
  }

  const handleRowClick = (hotelId: string) => {
    router.push(`/hotel/${hotelId}`);
  };

  return (
    <div className="flex min-h-screen flex-col p-24">
       <div className="flex mb-[50px] gap-4">
          <Image src={HotelSvg} width={32} height={32} alt="leaf img"/>
          <h2 className="leading-[36px] text-[36px]">해외 호텔 예약</h2>
       </div>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="border-b-2 border-pink-400 h-12">
            <th className="text-center w-12">번호</th>
            <th className="text-center w-80">호텔 ID</th>
            <th className="text-center w-96">호텔명</th>
            <th className="text-center w-80">호텔위치</th>
          </tr>
        </thead>
        <tbody>
          {hotelList?.map((hotel: any, index: number) => (
            <tr
              key={hotel.hotelId}
              onClick={() => handleRowClick(hotel.hotelId)}
              className="cursor-pointer hover:bg-purple-100 transition duration-200 ease-in-out h-12 border-b border-purple-300"
            >
              <td className="text-center">{index + 1}</td>
              <td className="text-center">{hotel.hotelId}</td>
              <td className="text-center">{hotel.name}</td>
              <td className="text-center">{hotel.latitude}, {hotel.longitude}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}