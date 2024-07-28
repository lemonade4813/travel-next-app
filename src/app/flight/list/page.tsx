"use client"


import { useEffect, useState } from "react"
import { getNowDate } from "@/app/util/getNowDate";
import { fetchData } from "@/app/util/common";
import { useSearchParams } from "next/navigation";
import { useFetch } from "@/app/util/useFetch";


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


export default function filghtList(){

    const {data : flightList, isLoading, error } = useFetch('http://localhost:8080/flight');

    console.log(flightList)
 
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

                        {/* <table className="min-w-full divide-y divide-gray-200">
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
                        </table> */}
                    </div>
                ))
            )
        }        
    </div>
    )

}