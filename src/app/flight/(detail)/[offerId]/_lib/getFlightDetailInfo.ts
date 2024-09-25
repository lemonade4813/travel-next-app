export async function getFlightDetailInfo (offerId : number) {

    const res = await fetch(`http://localhost:3000/flight/${offerId}`,
        {next : { revalidate : 0 }}
    )
    
    const { data } = await res.json();
    
    return data;
}