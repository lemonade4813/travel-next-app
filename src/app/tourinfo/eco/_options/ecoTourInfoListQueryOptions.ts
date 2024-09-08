import { getEcoTourInfoList } from "../_lib/getEcoTourInfoList";

export const ecoTourInfoListQueryOptions = () => ({
    queryKey: ['ecoTourInfoList'],
    queryFn: getEcoTourInfoList,
});
