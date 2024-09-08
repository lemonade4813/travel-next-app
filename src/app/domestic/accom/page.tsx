import { Suspense } from "react"
import { PrefetchBoundary } from "@/util/components/PrefetchBoundary"
import { domesticListQueryOptions } from "./_options/domesticAccomListOptions"
import AccomList from "./AccomList"
import Loading from "@/util/components/Loading"


export default async function DomesticAccom(){

    return(
        <Suspense fallback={<Loading/>}>
            <PrefetchBoundary prefetchOptions={domesticListQueryOptions()}>
                <AccomList/>
            </PrefetchBoundary>
        </Suspense>
    )
}