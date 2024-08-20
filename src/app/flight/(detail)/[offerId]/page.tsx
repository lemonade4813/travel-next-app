
async function getFlightDetailInfo (offerId : number) {

    const res = await fetch(`http://localhost:8080/flight/offer/detail/${offerId}`,
        {next : {revalidate : 0}}
    )
    return res.json();
}


export default async function FlightDetailInfo({ params }: { params: { offerId: number } }) {

    const flightDetailInfo = await getFlightDetailInfo(params.offerId);

    return (
        <div>
            <p>Type: {flightDetailInfo.type}</p>
            <p>Instant Ticketing Required: {flightDetailInfo.instantTicketingRequired ? "예" : "아니오"}</p>
            <p>Non-Homogeneous: {flightDetailInfo.nonHomogeneous ? "예" : "아니오"}</p>
            <p>One Way: {flightDetailInfo.oneWay ? "예" : "아니오"}</p>
            <p>Is Upsell Offer: {flightDetailInfo.isUpsellOffer}</p>
            <p>최종 예약 가능일자: {flightDetailInfo.lastTicketingDate}</p>
            <p>예약가능 좌석: {flightDetailInfo.numberOfBookableSeats}</p>

            {flightDetailInfo.itineraries?.map((itinerary: any, itineraryIndex: number) => (
                <div key={itineraryIndex}>
                    <p>소요시간: {itinerary.duration}</p>

                    {itinerary.segments?.map((seg: any, segmentIndex: number) => (
                        <div key={segmentIndex}>
                            <div>
                                <p>Departure IATA Code: {seg.departure.iataCode}</p>
                                <p>Departure Terminal: {seg.departure.terminal}</p>
                                <p>Departure Time: {seg.departure.at}</p>
                            </div>
                            <div>
                                <p>Arrival IATA Code: {seg.arrival.iataCode}</p>
                                <p>Arrival Terminal: {seg.arrival.terminal}</p>
                                <p>Arrival Time: {seg.arrival.at}</p>
                            </div>
                            <p>Carrier Code: {seg.carrierCode}</p>
                            <p>Flight Number: {seg.number}</p>
                            <p>Aircraft Code: {seg.aircraft.code}</p>
                            <p>Operating Carrier Code: {seg.operating.carrierCode}</p>
                            <p>Duration: {seg.duration}</p>
                            <p>Segment ID: {seg.id}</p>
                            <p>Number of Stops: {seg.numberOfStops}</p>
                            <p>Blacklisted in EU: {seg.blacklistedInEu ? "Yes" : "No"}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}