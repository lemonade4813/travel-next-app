import { getRecTourInfoList } from "../_lib/getRecTourInfoList";

export const recTourInfoListQueryOptions = () => ({
    queryKey: ['recTourInfoList'],
    queryFn: getRecTourInfoList,
});
