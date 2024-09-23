export async function getHotelPurchaseInfo() {
    

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/hotel/purchaselist`, {
        next: { revalidate: 0 },
    });

    const { data } = await res.json();
    
    return data;
}