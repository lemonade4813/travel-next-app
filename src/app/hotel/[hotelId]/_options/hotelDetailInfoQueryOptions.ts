import { getHotelDetailInfo } from "../_lib/getHotelDetailInfo";

export const hotelDetailInfoQueryOptions = (hotelId : string) => ({
    queryKey: ['hotelDetailInfo'],
    queryFn: () => getHotelDetailInfo(hotelId),
});
