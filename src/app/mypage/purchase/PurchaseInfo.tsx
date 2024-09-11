"use client"

import ErrorPage from "@/util/components/Error";
import Loading from "@/util/components/Loading";
import { useSuspenseQuery } from "@tanstack/react-query";
import { accomPurchaseInfoOptions } from "./_options/accomPurchaseInfoOptions";
import ReserveSvg from "../../../asset/reserve.svg";
import HotelSvg from "../../../asset/hotel2.svg";
import Image from "next/image";
import Link from "next/link";
import PurchaseDeleteButton from "./components/DeleteButton";


interface PurchaseItem {

    purchaseId: string;
    contentid: string;
    itemId: string;
    price: number;
    purchaseDate: string;
    type : string;
    title : string;

}


export default function PurchaseInfo(){

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
           
            <div className="grid grid-cols-2 gap-6">
            {accomPurchaseInfo?.map((purchaseItem : PurchaseItem)=> (
                 <Link href= {`http://localhost:3000/domestic/accom/${purchaseItem.contentid}`}>
                    <div className="mb-12 p-6 bg-gray-100 rounded-lg shadow-sm">
                        <div className="flex flex-col gap-4 text-gray-700">
                            <p className="text-lg">
                                <span className="text-indigo-600">구매 번호</span> | {purchaseItem.purchaseId}
                            </p>
                            <p className="text-lg">
                                <span className="text-indigo-600">숙박 업소</span> | {purchaseItem.title}
                            </p>
                            <p className="text-base">
                                <span className="font-medium text-indigo-600">예약 상품</span> | {purchaseItem.type}
                            </p>
                            <p className="text-base">
                                <span className="font-medium text-indigo-600">가격</span> | {purchaseItem.price.toLocaleString()}원
                            </p>
                            <p className="text-base">
                                <span className="font-medium text-indigo-600">예약 일자</span> | {new Date(purchaseItem.purchaseDate).toLocaleDateString()}
                            </p>
                            <PurchaseDeleteButton 
                                contentId={purchaseItem.contentid}
                                itemId={purchaseItem.itemId}
                                purchaseId={purchaseItem.purchaseId}                                
                            />
                        </div>
                    </div>
                </Link>
            ))}
            </div>
        </div>
       
    )
}
