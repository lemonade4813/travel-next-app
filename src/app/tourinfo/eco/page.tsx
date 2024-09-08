import { Suspense } from "react";
import EcoTourInfoList from "./EcoTourInfoList";
import { PrefetchBoundary } from "@/util/components/PrefetchBoundary";
import { ecoTourInfoListQueryOptions } from "./_options/ecoTourInfoListQueryOptions";
import Loading from "@/util/components/Loading";

export default function EcoTourInfo(){

    return (
        <Suspense fallback={<Loading/>}>
            <PrefetchBoundary prefetchOptions={ecoTourInfoListQueryOptions()} >
                <EcoTourInfoList/>
            </PrefetchBoundary>
        </Suspense>
    )
}