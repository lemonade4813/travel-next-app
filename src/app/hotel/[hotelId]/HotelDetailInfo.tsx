"use client"

import { useSuspenseQuery } from "@tanstack/react-query";
import { hotelDetailInfoQueryOptions } from "./_options/hotelDetailInfoQueryOptions";
import Loading from "@/util/components/Loading";
import ErrorPage from "@/util/components/Error";

export default function HotelDetailInfo({hotelId}: { hotelId : string}){


    const { data : hotelDetailInfo , error, isLoading, refetch} = useSuspenseQuery(hotelDetailInfoQueryOptions(hotelId))

    console.log(hotelDetailInfo)
    console.log(JSON.stringify(hotelDetailInfo))

    if(isLoading){
        <Loading/>
    }

    if(error){
        <ErrorPage errorMsg={error.message} refetch={refetch}/>
    }

    return(
        <h1>상세페이지</h1>
    )
}

