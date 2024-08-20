import { Suspense } from "react"
import 'react-datepicker/dist/react-datepicker.css';
import Loading from "./loading";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getFlightList } from "../util/getFlightList";
import FlightSearchOptions from "./FilghtSearchOptions";
import FlightList from "./FlightList";

type Props = {
    searchParams : {date : Date ; departAirport : string; arriveAirport : string; }
}


export default async function Flight({searchParams} : Props){


    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({queryKey : ['flight', searchParams], queryFn : getFlightList})
    const dehydrateState = dehydrate(queryClient)

    return (
        <div>
            <FlightSearchOptions/>
            <Suspense fallback={<Loading/>}>
                <HydrationBoundary state={dehydrateState}>
                    <FlightList searchParams = {searchParams}/>
                </HydrationBoundary>
            </Suspense>
        </div>
    )
}
