import { GET } from "@/util/apiPathConfig";
import { getAccessToken } from "@/util/getAccessToken";

export async function getAccomReservationInfo() {
    
    const accessToken = getAccessToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${GET['DOMESTIC_ACCOM_RESERVATION_INFO']}`, {headers : {
        "Authorization" : `Bearer ${accessToken}`
    }});

    if(!res.ok){
        throw new Error("오류가 발생했습니다.");
    }

    const { data } = await res.json();
    
    return data;
}