import Loading from "@/util/components/Loading";
import { PrefetchBoundary } from "@/util/components/PrefetchBoundary";
import { Suspense } from "react";
import AccomPurchaseInfo from "./AccomReservationInfo";
import HotelPurchaseInfo from "./HotelReservationInfo";
import { accomReservationInfoQueryOptions } from "./_options/accomReservationInfoOptions";
import { hotelReservationInfoQueryOptions } from "./_options/hotelReservationInfoOption";

export default async function MyPurchase(){

    return(
        <div className="flex flex-col w-1/2">
            <Suspense fallback={<Loading/>}>
                <PrefetchBoundary prefetchOptions={accomReservationInfoQueryOptions()}>
                    <AccomPurchaseInfo/>
                </PrefetchBoundary>
            </Suspense>

            <Suspense fallback={<Loading/>}>
                <PrefetchBoundary prefetchOptions={hotelReservationInfoQueryOptions()}>
                    <HotelPurchaseInfo/>
                </PrefetchBoundary>
            </Suspense>
        </div>

    )
}