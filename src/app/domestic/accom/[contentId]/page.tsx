import { Suspense } from "react";
import { PrefetchBoundary } from "@/util/components/PrefetchBoundary";
import AccomDetailInfo from "./AccomDetailInfo";
import { domesticQueryOptions } from "./_options/domesticQueryOptions";
import Loading from "@/util/components/Loading";

export default async function DomesticAccomDetail({ params }: { params: { contentId: string }} ) {
 
  return (
      <Suspense fallback={<Loading/>}>
        <PrefetchBoundary prefetchOptions={domesticQueryOptions(params.contentId)}>
          <AccomDetailInfo contentId={params.contentId}/>
        </PrefetchBoundary>
      </Suspense>
  );
}