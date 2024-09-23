export async function getFlightDetailInfo (offerId : number) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/flight/offer/detail/${offerId}`,
        {next : { revalidate : 0 }}
    )
    

    const { data } = await res.json();
    
    return data;
}