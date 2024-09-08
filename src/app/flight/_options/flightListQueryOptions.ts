import { getFlightList } from "../_lib/getFlightList";

type Props = {
    searchParams: { date: Date; departAirport: string; arriveAirport: string };
};

export const flightListQueryOptions = (searchParams: Props['searchParams']) => ({
    queryKey: ['flight', searchParams],
    queryFn: () => getFlightList(searchParams),
});
