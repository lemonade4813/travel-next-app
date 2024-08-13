import Loading from "@/app/flight/loading";
import { Suspense } from "react";
import EcoTourInfoList from "./ecoTourInfoList";

export default function EcoTourInfo(){

    return (
        <Suspense fallback={<Loading/>}>
            <EcoTourInfoList/>
        </Suspense>
    )
}