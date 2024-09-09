"use client"

import { useSuspenseQuery } from "@tanstack/react-query"
import { accomPurchaseInfoOptions } from "./_options/accomPurchaseInfoOptions"
import Loading from "@/util/components/Loading";
import ErrorPage from "@/util/components/Error";

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
        <div className="item-center">
        <h1>결제 정보</h1>
        {accomPurchaseInfo?.map((purchaseItem : PurchaseItem)=> (
            <div className="flex flex-col gap-[20px]">
                <div className="flex flex-col">
                    <p>숙박 업소 | {purchaseItem.title}</p>
                    <p>예약 상품 | {purchaseItem.type}</p>
                    <p>가격 | {purchaseItem.price}</p>
                    <p>예약 일자 | {purchaseItem.purchaseDate}</p>
                </div>
            </div>
        ))}
        </div>
    )
}