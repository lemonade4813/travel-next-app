type IFlightItem = {

    base : string;
    currency : string;
    originLocationCode : string;
    destinationLocationCode : string;
    numberOfBookableSeats : number;
    offerId : number;
    oneWay : boolean;
    total : string;
    lastTicketingDate : string;
}


async function getFlightList (queryString : string) {

    const res = await fetch(`http://localhost:8080/flight/offer?${queryString}`,
        {next : {revalidate : 6000}}
    )
    return res.json();
}

export default async function FilghtList({query} : {query : string}){


   const flightList = await getFlightList(query);

    return(
            <div>
            {flightList?.length > 0 &&
                (
                    flightList?.map((filghtItem : IFlightItem, index : number) => ( 
                        <div key={filghtItem.offerId} className="space-y-4 mb-20 mt-20">
                            <h3>예약 정보 {index + 1}</h3>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">통화</th>
                                        <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">기본가격</th>
                                        <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">총 가격</th>
                                        <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">편도여부</th>
                                        <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">예약가능 최종일자</th>
                                        <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">예약가능 좌석</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">{filghtItem.currency}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">{filghtItem.base}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">{filghtItem.total}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">{filghtItem.oneWay ? '예' : '아니오'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">{filghtItem.lastTicketingDate}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">{filghtItem.numberOfBookableSeats ?? 0}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ))
                )
            }        
        </div>
        )
    

}