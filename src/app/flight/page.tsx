"use client"

import { useEffect, useState } from "react"
import { fetchData } from "../util/common";

const flightCallUrl = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=SYD&destinationLocationCode=BKK&departureDate=2024-04-01&adults=1&nonStop=false&max=250`

export default function Flight(){

    const [flightList, setFlightList] = useState<any>([]);

    // useEffect(()=> {

    //     fetchData()

    // },[])


    console.log(flightList)

    return(
        <div className="flex min-h-screen flex-col items-center flex-start p-24">
            <h2>항공편 예약</h2>
        

            <button onClick={(e)=> fetchData(e, flightCallUrl)}className="rounded-lg w-20 h-10 bg-red-800 text-white">조회하기</button>
        </div>
    )


}