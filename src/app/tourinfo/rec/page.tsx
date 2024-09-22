import { Suspense } from "react";
import RecTourInfoList from "@/app/tourinfo/rec/RecTourInfoList";
import { recTourInfoListQueryOptions } from "./_options/recTourInfoListQueryOptions";
import { PrefetchBoundary } from "@/util/components/PrefetchBoundary";
import Loading from "@/util/components/Loading";


export default async function RecommendTourList(){

    return(
        <Suspense fallback={<Loading/>}>
            <PrefetchBoundary prefetchOptions={recTourInfoListQueryOptions()}>
                <RecTourInfoList/>
            </PrefetchBoundary>
        </Suspense>
    )
}