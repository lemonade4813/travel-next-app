import { GET } from "@/util/apiPathConfig";
import { getAccessToken } from "@/util/getAccessToken";

export const getDomesticAccomDetailInfo = async (contentId : string) => {

    const accessToken = getAccessToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${GET['DOMESTIC_ACOOM_DETAIL']}/${contentId}`, 
                              {
                                headers : {"Authorization" : `Bearer ${accessToken}`}
                              })
  
    if(!res.ok){
      throw new Error('오류가 발생했습니다.');
    }
  
    const { data } = await res.json();


    return data;
  
  }
  