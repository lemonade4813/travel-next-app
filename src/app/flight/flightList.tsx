import { useEffect, useState } from "react"
import { getNowDate } from "../util/getNowDate";
import { fetchData } from "../util/common";


type IFlightList = {

    departAirport : string;
    arriveAirport : string;
    date : Date | null;
}


export default function FlightList({departAirport, arriveAirport, date} : IFlightList) {


    const flightCallUrl = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${departAirport}&destinationLocationCode=${arriveAirport}&departureDate=${getNowDate(date!)}&adults=1&nonStop=false&max=250`

    const [flightList, setFlightList] = useState<any>([])

    useEffect(() => {
        const fetchFlightData = async () => {
            try {
                const data = await fetchData(flightCallUrl);
                setFlightList(data);
            } catch (error) {
                console.error("Error fetching flight data:", error);
            }
        };
        fetchFlightData();
    }, []);


    return(
        <div>
        {flightList?.data?.length > 0 &&
            (
                flightList?.data?.map(({itineraries, price, oneway} : any, index: number) => ( 
                    <div key={index} className="space-y-4 mb-20 mt-20">
                        <h3>예약 정보 {index + 1}</h3>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">통화</th>
                                    <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">기본가격</th>
                                    <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">총 가격</th>
                                    <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">편도여부</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{price.currency}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{price.base}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{price.grandTotal}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{oneway ? '편도' : '왕복'}</td>
                                </tr>
                            </tbody>
                        </table>

                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">출발공항코드</th>
                                    <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">터미널</th>
                                    <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">출발시간</th>
                                    <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">도착공항코드</th>
                                    <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">터미널</th>
                                    <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">도착시간</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {itineraries?.map((i :any, index: number) => (
                                    i.segments.map((seg : any, index: number) =>(
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">{seg.departure.iataCode}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">{seg.departure.terminal}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">{seg.departure.at.split('T').join(' ')}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">{seg.arrival.iataCode}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">{seg.arrival.terminal ?? '알 수 없음'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">{seg.arrival.at.split('T').join(' ')}</td>
                                        </tr>
                                    ))
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))
            )
        }        
    </div>
    )

}