export async function getFlightDetailInfo (offerId : number) {

    const res = await fetch(`http://localhost:8080/flight/offer/detail/${offerId}`,
        {next : { revalidate : 0 }}
    )
    

    const { data } = await res.json();
    
    return data;
}