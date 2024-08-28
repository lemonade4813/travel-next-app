import Loading from "@/app/flight/loading";
import { Suspense } from "react";
import RecTourInfoList from "./RecTourInfoList";


export default async function RecommendTourList(){


    return(

        <Suspense fallback={<Loading/>}>
            <RecTourInfoList/>
        </Suspense>


    )

}