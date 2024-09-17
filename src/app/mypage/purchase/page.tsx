import Loading from "@/util/components/Loading";
import { PrefetchBoundary } from "@/util/components/PrefetchBoundary";
import { Suspense } from "react";
import { accomPurchaseInfoOptions } from "./_options/accomPurchaseInfoOptions";
import AccomPurchaseInfo from "./AccomPurchaseInfo";
import { hotelListQueryOptions } from "@/app/hotel/_options/hotelListQueryOptions";
import HotelPurchaseInfo from "./HotelPurchaseInfo";

export default async function MyPurchase(){

    return(
        <div className="flex flex-col">
            <Suspense fallback={<Loading/>}>
                <PrefetchBoundary prefetchOptions={accomPurchaseInfoOptions()}>
                    <AccomPurchaseInfo/>
                </PrefetchBoundary>
            </Suspense>

            <Suspense fallback={<Loading/>}>
                <PrefetchBoundary prefetchOptions={hotelListQueryOptions()}>
                    <HotelPurchaseInfo/>
                </PrefetchBoundary>
            </Suspense>
        </div>

    )
}