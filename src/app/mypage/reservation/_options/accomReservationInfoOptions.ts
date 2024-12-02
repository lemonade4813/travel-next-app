import { getAccomReservationInfo } from "../_lib/getAccomReservationInfo";


export const accomReservationInfoQueryOptions = () => ({
    queryKey: ['accomPurchaseInfo'],
    queryFn: getAccomReservationInfo,
});
