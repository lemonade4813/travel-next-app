export async function getDomesticAccomList() {
    

    const res = await fetch(`http://localhost:8080/domestic/accom`, {
        next: { revalidate: 0 },
    });

    const { data } = await res.json();
    
    return data;
}