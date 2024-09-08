import { getDomesticAccomDetailInfo } from "../_lib/getDomesticAccomDetailInfo";

export const domesticQueryOptions = (detail : string) => ({
    queryKey: ['domesticAccom', detail],
    queryFn: () => getDomesticAccomDetailInfo(detail),
});
