import { getFlightDetailInfo } from "../_lib/getFlightDetailInfo";


export const flightDetailInfoQueryOptions = (offerId : number) => ({
    queryKey: ['domesticAccomList'],
    queryFn: () => getFlightDetailInfo(offerId),
});
