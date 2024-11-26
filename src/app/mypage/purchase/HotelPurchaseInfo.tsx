"use client"

import Image from "next/image";
import HotelSvg from "@/asset/hotel2.svg"
import { useSuspenseQuery } from "@tanstack/react-query";
import { hotelPurchaseInfoOptions } from "./_options/hotelPurchaseInfoOption";
import Loading from "@/util/components/Loading";
import ErrorPage from "@/util/components/Error";
import HotelPurchaseItem from "./HotelPurchaseItem";



interface HotelPurchaseItem{

    purchaseId : string;
    hotelId : string;
    offerId : string;

}

export default function HotelPurchaseInfo(){

    const { data : hotelPurchaseInfo, error, isPending, refetch } = useSuspenseQuery(hotelPurchaseInfoOptions());

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
            {hotelPurchaseInfo?.length === 0 ? (
            <div className="text-center text-gray-500">예약 목록이 존재하지 않습니다.</div>
        ) : (
            <div className="grid grid-cols-2 gap-6">
            {hotelPurchaseInfo?.map((purchaseItem: HotelPurchaseItem) => (
                <HotelPurchaseItem key={purchaseItem.purchaseId} {...purchaseItem} />
            ))}
            </div>
        )}
        </div>
    )
}