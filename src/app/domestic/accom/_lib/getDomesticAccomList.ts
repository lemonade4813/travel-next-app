import { API_PATH } from "@/util/apiPathConfig";
import { getAccessToken } from "@/util/getAccessToken";

export async function getDomesticAccomList() {

    const accessToken = getAccessToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${API_PATH['GET']['DOMESTIC_ACCOM_LIST']}`, 
    { 
        headers : {
            "Authorization" : `Bearer ${accessToken}`
    }});


    if(!res.ok){
        throw new Error("에러가 발생했습니다.");
    }

    const  { data }  = await res.json();
    
    return data;
}

// export async function getDomesticAccomList() {
//     const cookieStore = cookies();
//     const accessToken = cookieStore.get('accessToken')?.value;

//     console.log("cookies : " + getCookie('accessToken')!)
//     console.log("cookies : " + accessToken)

//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/domestic/accom`, {
//         next: { revalidate: 0 }, headers : {
//             "Authorization" : getCookie('accessToken')!
//         }
//     });


//     if(!res.ok){
//         throw new Error("에러가 발생했습니다.");
//     }

//     const { data } = await res.json();
    
//     return data;
// }

