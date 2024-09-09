import { getAccomPurchaseInfo } from "../_lib/getAccomPurchaseInfo";


export const accomPurchaseInfoOptions = () => ({
    queryKey: ['accomPurchaseInfo'],
    queryFn: getAccomPurchaseInfo,
});
