import { getHotelReservationInfo } from "../_lib/getHotelReservationInfo";



export const hotelReservationInfoQueryOptions = () => ({
    queryKey: ['hotelReservationInfo'],
    queryFn: getHotelReservationInfo,
});
