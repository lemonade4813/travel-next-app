"use client"

import { useEffect, useState } from "react"
import { useFetch } from "../util/common";
import CustomerDatePicker from "../util/DatePicker";
import DatePicker from "react-datepicker";
import styles from '../../scss/DatePicker.module.scss'
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from "date-fns/locale";
import { iataCode } from "../util/iataCode";

// const flightCallUrl = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=SYD&destinationLocationCode=BKK&departureDate=2024-04-01&adults=1&nonStop=false&max=250`

export default function Flight(){



    const [departCountry, setDepartCountry] = useState('')
    const [departAirport, setDepartAirport] = useState('')
    const [arriveCountry, setArriveCountry] = useState('')
    const [arriveAirport, setArriveAirport] = useState('')

    const flightCallUrl = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${departAirport}&destinationLocationCode=${arriveAirport}&departureDate=2024-04-01&adults=1&nonStop=false&max=250`



    console.log(flightCallUrl)

    const {data : flightList , isLoading, error} = useFetch(flightCallUrl)

    const [date, setDate ] = useState< Date | null>(new Date());

    return(
        <div className="flex min-h-screen flex-col items-center p-24">
            <h2 className="text-2xl">항공편 예약</h2>
            <div className="flex items-center gap-4 mt-40"> 
                <p>출발일자 선택</p>
                <DatePicker 
                    className = {`bg-pink-50 border-2 border-pink-600 text-pink-600 rounded-md h-10 w-32 ${styles['react-datepicker']}`}
                    selected={date} 
                    onChange={setDate}
                    dateFormat={'yyyy-MM-dd'}
                    locale={ko}    
                />
                <p>출발국가</p>
                <select 
                    className={`bg-pink-50 border-2 border-pink-600 text-pink-600 rounded-md h-10 w-32`}
                    onChange={(e) => setDepartCountry(e.target.value)}>
                    {iataCode.map((list) =>
                        <option>{list.country}</option>
                    )}
                </select>
                <p>출발공항 선택</p>
                <select 
                    className={`bg-pink-50 border-2 border-pink-600 text-pink-600 rounded-md h-10 w-32`}
                    onChange={(e) => setDepartAirport(e.target.value)}>
                    {iataCode.find((list) => list.country === departCountry)?.airport.map((a) =>
                        <option>{a}</option>
                    )}
                </select>
                <p>도착공항</p>
                <select 
                    className={`bg-pink-50 border-2 border-pink-600 text-pink-600 rounded-md h-10 w-32`}
                    onChange={(e) => setArriveCountry(e.target.value)}>
                    {iataCode.map((list) =>
                        <option>{list.country}</option>
                    )}
                </select>
                <p>도착공항 선택</p>
                <select 
                    className={`bg-pink-50 border-2 border-pink-600 text-pink-600 rounded-md h-10 w-32`}
                    onChange={(e) => setArriveAirport(e.target.value)}>
                    {iataCode.find((list) => list.country === arriveCountry)?.airport.map((a) =>
                        <option>{a}</option>
                    )}
                </select>
            </div>
            {/* <ReactDatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
            /> */}
            <button className="rounded-lg w-40 h-12 bg-red-800 text-white mt-20">조회하기</button>
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