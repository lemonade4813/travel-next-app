export async function getAccomPurchaseInfo() {
    

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/domestic/accom/purchaseinfo?userId=user01`, {
        next: { revalidate: 0 },
    });

    const { data } = await res.json();
    
    return data;
}