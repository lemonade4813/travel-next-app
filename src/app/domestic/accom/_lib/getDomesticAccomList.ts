import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';


export async function getDomesticAccomList() {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/domestic/accom`);


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

