export async function getFlightList(searchParams: { date: Date; departAirport: string; arriveAirport: string }) {
    
    const { date, departAirport, arriveAirport } = searchParams;

    const res = await fetch(`http://localhost:8080/flight/offer?date=${date}&departAirport=${departAirport}&arriveAirport=${arriveAirport}`, {
        next: { revalidate: 0 },
    });

    const { data } = await res.json();
    
    return data;
}