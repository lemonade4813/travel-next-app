export async function getHotelPurchaseInfo() {
    

    const res = await fetch(`http://localhost:8080/hotel/purchaselist`, {
        next: { revalidate: 0 },
    });

    const { data } = await res.json();
    
    return data;
}