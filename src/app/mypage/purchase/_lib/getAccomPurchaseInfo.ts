export async function getAccomPurchaseInfo() {
    

    const res = await fetch('http://localhost:3000/api/mypage/purchase/accom');

    if(!res.ok){
        throw new Error("오류가 발생했습니다.");
    }

    const { data } = await res.json();
    
    return data;
}