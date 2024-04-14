"use client"

import Image from "next/image";
import { useFetch } from "../util/useFetch"
import spinner from '../../asset/spinner.gif'
export default function Hotel(){


    const hotelListCallUrl = `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=PAR&radius=5`

    const {data, isLoading, error } = useFetch(hotelListCallUrl);

    const hotelList = data?.data;

    if(isLoading){
        return (
                    <div className='flex min-h-screen flex-col items-center justify-between p-24'>
                        <Image src={spinner} alt="spinner" width={50} height={50}/>
                    </div>
                )
            }

    return(
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <h2>호텔 예약</h2>
                <div className='flex flex-row gap-6 h-16 mt-6 border-pink-400 border-b-2 justify-center items-center'>
                    <p className='w-12 text-center'>번호</p>   
                    <p className='w-80 text-center'>호텔 ID</p>
                    <p className='w-96 text-center'>호텔명</p>
                    <p className='w-80 text-center'>호텔위치</p>
                    <p className='w-80 text-center'>최종 업데이트 일자</p>
                </div>
            {hotelList?.map((hotel : any, index : number)=> (
                <div className='flex flex-row gap-6 h-16 mt-6 rounded-lg border-purple-300 border-2 justify-center items-center cursor-pointer'>
                    <p className='w-12 text-center'>{index + 1}</p>   
                    <p className='w-80 text-center'>{hotel.hotelId}</p>
                    <p className='w-96 text-center'>{hotel.name}</p>
                    <p className='w-80 text-center'>{hotel.geoCode.latitude}, {hotel.geoCode.longitude}</p>
                    <p className='w-80 text-center'>{hotel.lastUpdate.split('T').join(' ')}</p>
                </div>
            ))}
        </div>
    )
}