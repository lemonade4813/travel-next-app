"use client"

import { useSuspenseQuery } from "@tanstack/react-query";
import { hotelListQueryOptions } from "./_options/hotelListQueryOptions";
import Loading from "@/util/components/Loading";
import ErrorPage from "@/util/components/Error";

export default async function HotelList(){

    const { data : hotelList , isPending , error, refetch } = useSuspenseQuery(hotelListQueryOptions());

    if(isPending){
        return <Loading/>
    }

    if(error){
        return <ErrorPage refetch={refetch} errorMsg={error.message}/>
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