import { getHotelPurchaseInfo } from "../_lib/getHotelPurchaseInfo";


export const hotelPurchaseInfoOptions = () => ({
    queryKey: ['hotelPurchaseInfo'],
    queryFn: getHotelPurchaseInfo,
});
