import Loading from "@/app/flight/loading";
import { Suspense } from "react";
import FlightList from "./flightList"
export default function EcoTourInfo({params}: {params : {query : string}}){

    const queryString = (decodeURIComponent(params.query))
   
    console.log(params)

    return (
        <Suspense fallback={<Loading/>}>
            <FlightList query={queryString}/>
        </Suspense>
    )
}