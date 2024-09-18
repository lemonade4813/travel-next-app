"use client"

import ErrorPage from "@/util/components/Error";
import Loading from "@/util/components/Loading";
import { useSuspenseQuery } from "@tanstack/react-query";
import { accomPurchaseInfoOptions } from "./_options/accomPurchaseInfoOptions";
import ReserveSvg from "../../../asset/reserve.svg";
import HotelSvg from "../../../asset/hotel2.svg";
import Image from "next/image";
import AccomPurchaseItem from "./AccomPurchaseItem";


interface AccomPurchaseItem {

    purchaseId: string;
    contentid: string;
    itemId: string;
    price: number;
    purchaseDate: string;
    type : string;
    title : string;

}


export default function AccomPurchaseInfo(){

    const { data : accomPurchaseInfo, error, isPending, refetch } = useSuspenseQuery(accomPurchaseInfoOptions());

    if(isPending){
        return <Loading/>
    }

    if(error){
        return <ErrorPage errorMsg={error.message} refetch={refetch}/>
    }

    return(
        <div className="w-2/3">
            <div className="flex items-center mt-12 mb-8 gap-4">
                <Image src={ReserveSvg} alt="reservation image" width={32} height={32}/>
                <h1 className="text-[32px] text-gray-800 font-bold">내 예약정보</h1>
            </div>
            <div className="flex items-center gap-4 ml-12 mt-8 mb-12">
                <Image src={HotelSvg} alt="lodge image" width={32} height={32}/>
                <h1 className="text-[32px] text-gray-800 font-bold">국내 숙박 예약</h1>
            </div>
            
            {accomPurchaseInfo?.length === 0 ? (
                <div className="text-center text-gray-500">예약 목록이 존재하지 않습니다.</div>
            ) : (
                <div className="grid grid-cols-2 gap-6">
                    {accomPurchaseInfo?.map((purchaseItem : AccomPurchaseItem)=> (
                        <AccomPurchaseItem {...purchaseItem}/>
                    ))}
                </div>
            )}
        </div>
    )
}
