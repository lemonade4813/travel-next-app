import { getHotelList } from "../_lib/getHotelList";

export const hotelListQueryOptions = () => ({
    queryKey: ['hotelList'],
    queryFn: getHotelList,
});
