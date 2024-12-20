"use client"

import Image from "next/image";
import HotelSvg from "@/asset/hotel2.svg"
import { useSuspenseQuery } from "@tanstack/react-query";
import { hotelReservationInfoQueryOptions } from "./_options/hotelReservationInfoOption";
import Loading from "@/util/components/Loading";
import ErrorPage from "@/util/components/Error";
import HotelPurchaseItem from "./HotelReservationItem";



interface IHotelReservationItem{

    reservationId : string;
    hotelId : string;
    offerId : string;

}

export default function hotelReservationInfo(){

    const { data : hotelReservationInfo, error, isPending, refetch } = useSuspenseQuery(hotelReservationInfoQueryOptions());

    if(isPending){
        return <Loading/>
    }

    if(error){
        return <ErrorPage errorMsg={error.message} refetch={refetch}/>
    }


    return(
        <div className="w-2/3">
            <div className="flex items-center gap-4 ml-12 mt-8 mb-12">
                <Image src={HotelSvg} alt="lodge image" width={32} height={32}/>
                <h1 className="text-[32px] text-gray-800 font-bold">해외 호텔 예약</h1>
            </div>
            {hotelReservationInfo?.length === 0 ? (
            <div className="text-center text-gray-500">예약 목록이 존재하지 않습니다.</div>
        ) : (
            <div className="grid grid-cols-2 gap-6">
            {hotelReservationInfo?.map((reservationItem: IHotelReservationItem) => (
                <HotelPurchaseItem key={reservationItem.reservationId} {...reservationItem} />
            ))}
            </div>
        )}
        </div>
    )
}