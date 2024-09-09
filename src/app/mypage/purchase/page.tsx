import Loading from "@/util/components/Loading";
import { PrefetchBoundary } from "@/util/components/PrefetchBoundary";
import { Suspense } from "react";
import { accomPurchaseInfoOptions } from "./_options/accomPurchaseInfoOptions";
import PurchaseInfo from "./PurchaseInfo";

export default async function MyPurchase(){

    return(
        <Suspense fallback={<Loading/>}>
            <PrefetchBoundary prefetchOptions={accomPurchaseInfoOptions()}>
                <PurchaseInfo/>
            </PrefetchBoundary>
        </Suspense>
    )
}