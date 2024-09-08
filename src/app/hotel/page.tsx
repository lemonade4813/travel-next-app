import { PrefetchBoundary } from "@/util/components/PrefetchBoundary";
import { Suspense } from "react";
import HotelList from "./HotelList";
import { hotelListQueryOptions } from "./_options/hotelListQueryOptions";
import Loading from "@/util/components/Loading";


export default async function Hotel(){

    return(
        <Suspense fallback={<Loading/>}>
            <PrefetchBoundary prefetchOptions={hotelListQueryOptions()}>
                <HotelList/>
            </PrefetchBoundary>
        </Suspense>
    )
}