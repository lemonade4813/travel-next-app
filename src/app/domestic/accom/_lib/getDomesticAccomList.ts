export async function getDomesticAccomList() {
    

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/domestic/accom`, {
        next: { revalidate: 0 },
    });

    const { data } = await res.json();
    
    return data;
}