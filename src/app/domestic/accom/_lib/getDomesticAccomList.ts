import { GET } from "@/util/apiPathConfig";
import { getAccessToken } from "@/util/getAccessToken";
import { redirect } from "next/navigation";

export async function getDomesticAccomList() {

    const accessToken = getAccessToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${GET['DOMESTIC_ACCOM_LIST']}`, 
    { 
        headers : {
            "Authorization" : `Bearer ${accessToken}`
    }});


    if(!res.ok){
        if(res.status === 401){
            redirect("/login")
        }
        throw new Error(`에러가 발생했습니다. ${res.status}` );
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

