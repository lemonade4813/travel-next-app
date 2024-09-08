import { getDomesticAccomList } from "../_lib/getDomesticAccomList";

export const domesticListQueryOptions = () => ({
    queryKey: ['domesticAccomList'],
    queryFn: getDomesticAccomList,
});
