"use client"

import { useFetch } from "../util/useFetch"

export default function Hotel(){


    const hotelListCallUrl = `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=PAR&radius=5`


    const {data , isLoading, error} = useFetch(hotelListCallUrl);

    const hotelList = data?.data;

    return(
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <h2>호텔 예약</h2>
            {hotelList?.map((hotel : any)=> (
                <div>
                    <p>{hotel.name}</p>
                    <p>{hotel.lastUpdate}</p>
                </div>
            ))}
        </div>
    )
}