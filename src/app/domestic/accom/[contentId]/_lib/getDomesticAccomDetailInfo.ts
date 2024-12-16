import { GET } from "@/util/apiPathConfig";
import { getAccessToken } from "@/util/getAccessToken";
import { redirect } from "next/navigation";

export const getDomesticAccomDetailInfo = async (contentId : string) => {

    const accessToken = getAccessToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${GET['DOMESTIC_ACOOM_DETAIL']}/${contentId}`, 
                              {
                                headers : {"Authorization" : `Bearer ${accessToken}`}
                              })
  
    if(!res.ok){
        if(res.status === 401){
          redirect("/login")
        }
      throw new Error(`에러가 발생했습니다. 오류 코드 : ${res.status}` );
    }
  
    const { data } = await res.json();


    return data;
  
  }
  