import { GET } from "@/util/apiPathConfig";
import { getAccessToken } from "@/util/getAccessToken";

export async function getFlightDetailInfo (offerId : number) {

    const accessToken = getAccessToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${GET['FLIGHT_DETAIL']}/${offerId}`,
        {headers : {
            "Authorization" : `Bearer ${accessToken}`
        }}
    )
    
    const { data } = await res.json();
    
    return data;
}