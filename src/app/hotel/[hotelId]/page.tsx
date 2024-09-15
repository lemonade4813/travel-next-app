import { PrefetchBoundary } from "@/util/components/PrefetchBoundary";
import { getHotelDetailInfo } from "./_lib/getHotelDetailInfo";
import { hotelDetailInfoQueryOptions } from "./_options/hotelDetailInfoQueryOptions";
import { Suspense } from "react";
import HotelDetailInfo from "./HotelDetailInfo";
import Loading from "@/util/components/Loading";


type Props = {
    params : {
        hotelId : string;
    }
}


export default async function HotelDetailInfoPage({params : { hotelId}} : Props){


    return(
        <Suspense fallback={<Loading/>}> 
            <PrefetchBoundary prefetchOptions={hotelDetailInfoQueryOptions(hotelId)}>
                <HotelDetailInfo hotelId={hotelId} />
            </PrefetchBoundary>
        </Suspense> 
    )      
}