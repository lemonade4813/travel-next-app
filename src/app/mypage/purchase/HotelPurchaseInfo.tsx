"use client"

import Image from "next/image";
import HotelSvg from "../../../asset/hotel2.svg"
import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";
import { hotelPurchaseInfoOptions } from "./_options/hotelPurchaseInfoOption";
import Loading from "@/util/components/Loading";
import ErrorPage from "@/util/components/Error";
import HotelPurchaseDeleteButton from "./components/HotelPurchaseDeleteButton";


interface HotelPurchaseInfoItem{

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
   
    <div className="grid grid-cols-2 gap-6">
    {hotelPurchaseInfo?.map((purchaseItem : HotelPurchaseInfoItem)=> (
         <Link href= {`http://localhost:3000/hotel/${purchaseItem.hotelId}`}>
            <div className="mb-12 p-6 bg-gray-100 rounded-lg shadow-sm">
                <div className="flex flex-col gap-4 text-gray-700">
                    <p className="text-base">
                        <span className="text-indigo-600">구매 번호</span> | {purchaseItem.purchaseId}
                    </p>
                    <p className="text-base">
                        <span className="text-indigo-600">호텔 정보</span> | {purchaseItem.hotelId}
                    </p>
                    <p className="text-base">
                        <span className="font-medium text-indigo-600">예약 상품</span> | {purchaseItem.offerId}
                    </p>
                    <HotelPurchaseDeleteButton 
                        purchaseId={purchaseItem.purchaseId} 
                        hotelId={purchaseItem.hotelId}
                        offerId={purchaseItem.offerId}
                    />
                </div>
            </div>
        </Link>
    ))}
    </div>
</div>

)

}