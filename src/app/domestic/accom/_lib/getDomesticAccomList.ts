export async function getDomesticAccomList() {
    

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/domestic/accom`, {
        next: { revalidate: 0 },
    });


    if(!res.ok){
        throw new Error("에러가 발생했습니다.");
    }

    const { data } = await res.json();
    
    return data;
}