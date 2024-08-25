import parserISO8601Duration from "@/app/util/parseISO8601Duration";
import AirplaneSvg from "../../../../asset/airplane.svg" 
import Image from "next/image";
import { carriers } from "@/app/util/carrier";
import { aircraft } from "@/app/util/aircraft";


async function getFlightDetailInfo (offerId : number) {

    const res = await fetch(`http://localhost:8080/flight/offer/detail/${offerId}`,
        {next : {revalidate : 0}}
    )
    return res.json();
}

export default async function FlightDetailInfo({ params }: { params: { offerId: number } }) {

    const flightDetailInfo = await getFlightDetailInfo(params.offerId);

    return (
        <div className="flex min-h-screen flex-col items-center p-24">
           <div className="flex flex-1 justify-between text-center gap-4 w-full">
                <div className="shadow-md rounded-md flex-1">
                    <p className="p-4 bg-yellow-400 rounded-t-md">편도 여부</p>
                    <p className="p-4 bg-yellow-100 rounded-b-md">{flightDetailInfo.oneWay ? "예" : "아니오"}</p>
                </div>
                <div className="shadow-md rounded-md flex-1">
                    <p className="p-4 bg-yellow-400 rounded-t-md">최종 예약 가능일자</p>
                    <p className="p-4 bg-yellow-100 rounded-b-md">{flightDetailInfo.lastTicketingDate}</p>
                </div>
                <div className="shadow-md rounded-md flex-1">
                    <div className="p-4 bg-yellow-400 rounded-t-md">예약가능 좌석</div>
                    <div className="p-4 bg-yellow-100 rounded-b-md">{flightDetailInfo.numberOfBookableSeats}</div>
                </div>
            </div>
            {flightDetailInfo.itineraries?.map((itinerary: any, itineraryIndex: number) => (
                <div key={itineraryIndex}>
                    <div className="mb-[30px] mt-[60px]">
                        <p className="p-4 text-[20px] border-purple-200 border-b-4">총 소요시간</p>
                        <p className="p-4 text-[20px]">{parserISO8601Duration(itinerary.duration)}</p>
                    </div>
                    {itinerary.segments?.map((seg: any, segmentIndex: number) => (
                        <div key={segmentIndex} className="mb-[60px]">
                            <div className="flex gap-[10px] mb-[10px]">
                                <Image src={AirplaneSvg} alt="airplane" width={20} height={20}/>
                                <h4 className="text-[24px]">탑승 정보 {segmentIndex + 1}</h4>
                            </div>
                            <div className="flex mb-[10px] shadow-md rounded-md">
                                <p className="p-4 flex-1 bg-red-200 rounded-l-md">출발 공항 코드(IATA)</p>
                                <p className="p-4 flex-1 bg-red-100">{seg.departure.iataCode}</p>
                        
                                <p className="p-4 flex-1 bg-red-200">출발 터미널 번호</p>
                                <p className="p-4 flex-1 bg-red-100">{seg.departure.terminal}</p>
                        
                                <p className="p-4 flex-1 bg-red-200">출발 시각</p>
                                <p className="p-4 flex-1 bg-red-100 rounded-r-md">{seg.departure.at.replace("T"," ")}</p>
                            </div>
                            <div className="flex shadow-md rounded-md">
                                <p className="p-4 flex-1 bg-red-200 rounded-l-md">도착 공항 코드(IATA)</p>
                                <p className="p-4 flex-1 bg-red-100">{seg.arrival.iataCode}</p>
                        
                                <p className="p-4 flex-1 bg-red-200">도착 터미널 번호</p>
                                <p className="p-4 flex-1 bg-red-100">{seg.arrival.terminal}</p>
                        
                                <p className="p-4 flex-1 bg-red-200">도착 시각</p>
                                <p className="p-4 flex-1 bg-red-100 rounded-r-md">{seg.arrival.at.replace("T"," ")}</p>
                            </div>
                            <div className="flex gap-[20px] mt-[20px]">
                                <div className="text-center">
                                    <p className="p-4 bg-red-200 shadow-md rounded-t-md">항공사</p> 
                                    <p className="p-4 bg-red-100 shadow-md rounded-b-md">
                                        {carriers[seg.carrierCode as keyof typeof carriers]}
                                    </p>
                                </div>
                                <div className="text-center">
                                    <p className="p-4 bg-red-200 shadow-md rounded-t-md">비행편 번호</p>
                                    <p className="p-4 bg-red-100 shadow-md rounded-t-md">{seg.number}</p>
                                </div>
                                <div className="text-center">
                                    <p className="p-4 bg-red-200 shadow-md rounded-t-md">항공기 명</p>
                                    <p className="p-4 bg-red-100 shadow-md rounded-t-md">
                                        {aircraft[seg.aircraft.code as keyof typeof aircraft]}
                                    </p>
                                </div>
                                <div className="text-center">
                                    <p className="p-4 bg-red-200 shadow-md rounded-t-md">소요 시간</p>
                                    <p className="p-4 bg-red-100 shadow-md rounded-t-md">{parserISO8601Duration(seg.duration)}</p>
                                </div>
                                <div className="text-center">
                                    <p className="p-4 bg-red-200 shadow-md rounded-t-md">Number of Stops</p>
                                    <p className="p-4 bg-red-100 shadow-md rounded-t-md">{seg.numberOfStops}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}