export async function getFlightList(searchParams: { date: Date; departAirport: string; arriveAirport: string }) {
    
    const { date, departAirport, arriveAirport } = searchParams;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/flight/offer?date=${date}&departAirport=${departAirport}&arriveAirport=${arriveAirport}`, {
        next: { revalidate: 0 },
    });

    if(!res.ok){
        throw new Error("오류가 발생했습니다.");
    }

    const { data } = await res.json();
    
    return data;
}