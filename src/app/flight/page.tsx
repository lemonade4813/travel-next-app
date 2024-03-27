"use client"

import { useEffect, useState } from "react"
import { useFetch } from "../util/common";

const flightCallUrl = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=SYD&destinationLocationCode=BKK&departureDate=2024-04-01&adults=1&nonStop=false&max=250`

export default function Flight(){

    const {data : flightList , isLoading, error} = useFetch(flightCallUrl)

    return(
        <div className="flex min-h-screen flex-col items-center p-24">
            <h2 className="">항공편 예약</h2>
            <button className="rounded-lg w-20 h-10 bg-red-800 text-white mt-20">조회하기</button>
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