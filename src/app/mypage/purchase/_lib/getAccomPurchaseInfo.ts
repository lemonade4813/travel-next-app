export async function getAccomPurchaseInfo() {
    

    const res = await fetch(`http://localhost:8080/domestic/accom/purchaseinfo?userId=user01`, {
        next: { revalidate: 0 },
    });

    const { data } = await res.json();
    
    return data;
}