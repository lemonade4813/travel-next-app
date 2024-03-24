"use client"

import { useEffect, useState } from "react"
import { useAxios } from "../util/common";

const flightCallUrl = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=SYD&destinationLocationCode=BKK&departureDate=2024-04-01&adults=1&nonStop=false&max=250`

export default function Flight(){

    // const [flightList, setFlightList] = useState<any>([]);

   
    // const {data, isLoading, error} = useAxios(flightCallUrl)

    const {data : flightList , isLoading, error} = useAxios(flightCallUrl)


    console.log(flightList?.data)

    return(
        <div className="flex min-h-screen flex-col items-center p-24">
            <h2>항공편 예약</h2>
        
            {flightList?.data?.length > 0 &&
                (
                    flightList?.data?.map(({itineraries, price, oneway} : any) => ( 
                        <div>
                            <table>
                                <tr className="bg-red-200 h-10">
                                    <th>통화</th>
                                    <th>기본가격</th>
                                    <th>총 가격</th>
                                    <td>편도여부</td>
                                </tr>
                                <tr className="bg-blue-200 h-10">
                                    <td>{price.currency}</td>
                                    <td>{price.base}</td>
                                    <td>{price.grandTotal}</td>
                                    <td>{oneway ? '편도' : '왕복'}</td>
                                </tr>
                            </table>

                            <table>
                                <tr className="bg-green-200">
                                    <td>공항코드</td>
                                    <td>터미널</td>
                                    <td>시간</td>
                                </tr>
                            {itineraries?.map((i :any) => (
                                i.segments.map((seg : any) =>(
                                    <tr className="bg-purple-200">
                                        <td>{seg.arrival.iataCode}</td>
                                        <td>{seg.arrival.terminal ?? '알 수 없음 '}</td>
                                        <td>{seg.arrival.at}</td>
                                        <td>{seg.departure.iataCode}</td>
                                        <td>{seg.departure.terminal}</td>
                                        <td>{seg.departure.at}</td>
                                    </tr>
                                )
                            ) 
                            ))}
                            </table>
                            </div>
                        )
                    )
                )
            }        
            <button className="rounded-lg w-20 h-10 bg-red-800 text-white">조회하기</button>
        </div>
    )


}