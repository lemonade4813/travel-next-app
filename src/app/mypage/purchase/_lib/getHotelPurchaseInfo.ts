export async function getHotelPurchaseInfo() {
    

    const res = await fetch('http://localhost:3000/api/mypage/purchase/hotel', {
        next: { revalidate: 0 },
    });

    if(!res.ok){
        throw new Error("오류가 발생했습니다.");
    }

    const { data } = await res.json();
    
    return data;
}