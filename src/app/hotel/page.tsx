"use client"

import { useFetch } from "../util/useFetch"
import Loading from "../flight/loading";
export default function Hotel(){


    const {data : hotelList, isLoading, error } = useFetch('http://localhost:8080/hotel');
    

    if(isLoading){
        return <Loading/>
    }

    if(error){
        console.log(error)
    }

    return(
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <h2>호텔 예약</h2>
                <div className='flex flex-row gap-6 h-16 mt-6 border-pink-400 border-b-2 justify-center items-center'>
                    <p className='w-12 text-center'>번호</p>   
                    <p className='w-80 text-center'>호텔 ID</p>
                    <p className='w-96 text-center'>호텔명</p>
                    <p className='w-80 text-center'>호텔위치</p>
                    {/* <p className='w-80 text-center'>최종 업데이트 일자</p> */}
                </div>
            {hotelList?.map((hotel : any, index : number)=> (
                <div className='flex flex-row gap-6 h-16 mt-6 rounded-lg border-purple-300 border-2 justify-center items-center cursor-pointer'>
                    <p className='w-12 text-center'>{index + 1}</p>   
                    <p className='w-80 text-center'>{hotel.hotelId}</p>
                    <p className='w-96 text-center'>{hotel.name}</p>
                    <p className='w-80 text-center'>{hotel.latitude}, {hotel.longitude}</p>
                    {/* <p className='w-80 text-center'>{hotel.lastUpdate.split('T').join(' ')}</p> */}
                </div>
            ))}
        </div>
    )
}