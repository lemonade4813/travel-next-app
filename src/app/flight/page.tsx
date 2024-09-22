import { Suspense } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import FlightSearchOptions from "./FlightSearchOptions";
import FlightList from "./FlightList";
import { PrefetchBoundary } from "@/util/components/PrefetchBoundary";
import { flightListQueryOptions } from "./_options/flightListQueryOptions";
import Loading from "@/util/components/Loading";

type Props = {
    searchParams: { date: Date; departAirport: string; arriveAirport: string };
};


export default async function Flight({ searchParams }: Props) {
    return (
        <div>
            <FlightSearchOptions />
            <Suspense fallback={<Loading/>}>
                <PrefetchBoundary prefetchOptions={flightListQueryOptions(searchParams)}>
                    <FlightList searchParams={searchParams} />
                </PrefetchBoundary>
            </Suspense>
        </div>
    );
}