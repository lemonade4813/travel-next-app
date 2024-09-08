"use client"

import NavButton from "@/components/NavButton";
import { useSuspenseQuery } from "@tanstack/react-query";
import { flightListQueryOptions } from "./_options/flightListQueryOptions";
import Loading from "@/util/components/Loading";
import ErrorPage from "@/util/components/Error";

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


type Props = {
    searchParams : {date : Date ; departAirport : string; arriveAirport : string; }
}

export default function FlightList( {searchParams} : Props){

    const { data : flightList , isPending , error , refetch } = useSuspenseQuery(flightListQueryOptions(searchParams));

    if(isPending){
        return <Loading/>
    }

    if(error){
        return <ErrorPage refetch={refetch} errorMsg={error.message}/>
    }


    return(
            <div>
            {flightList?.length > 0 &&
                (
                    flightList?.map((flightItem : IFlightItem, index : number) => ( 
                        <div key={flightItem.offerId} className="space-y-4 mb-20 mt-20">
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
                                        <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">상세정보 보기</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">{flightItem.currency}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">{flightItem.base}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">{flightItem.total}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">{flightItem.oneWay ? '예' : '아니오'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">{flightItem.lastTicketingDate}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">{flightItem.numberOfBookableSeats ?? 0}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center"><NavButton to={`/flight/${flightItem.offerId}`}/></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ))
                )
            }        
        </div>
        )
}