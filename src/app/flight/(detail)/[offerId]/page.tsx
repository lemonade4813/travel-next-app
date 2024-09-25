import "./style.css"
import { Suspense } from "react";
import { PrefetchBoundary } from "@/util/components/PrefetchBoundary";
import { flightDetailInfoQueryOptions } from "./_options/flightDetailInfoQuery";
import FlightDetailInfo from "./FlightDetailInfo";
import Loading from "@/util/components/Loading";



export default async function FlightDetailInfoPage({ params }: { params: { offerId: number } }) {


    return (
        <Suspense fallback={<Loading/>}>
            <PrefetchBoundary prefetchOptions={flightDetailInfoQueryOptions(params.offerId)}>
                <FlightDetailInfo offerId={params.offerId} />
            </PrefetchBoundary>
        </Suspense>
    );
}