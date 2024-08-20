export async function getFlightList ({queryKey} : {queryKey : any}) {

    const [_1, searchParams ] = queryKey;



    const res = await fetch(`http://localhost:8080/flight/offer`,
        {next : {revalidate : 6000}}
    )
    return res.json();
}