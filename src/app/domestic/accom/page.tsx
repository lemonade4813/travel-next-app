"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useFetch } from "@/app/util/useFetch"
import Loading from "@/app/flight/loading"
import NoImageSvg from "../../../asset/noImage.svg"
import useKakaoLoader from "@/components/useKakaoLoader"
import { Map, MapMarker } from "react-kakao-maps-sdk"

const convertToDateTimeFormat = (dateStr : string) => {

    return `${dateStr.slice(0,4)}-
            ${dateStr.slice(4,6)}-
            ${dateStr.slice(6,8)} 
            ${dateStr.slice(8,10)} : 
            ${dateStr.slice(10, 12)} : 
            ${dateStr.slice(12,14)}` 
}


export default function DomesticAccom(){

    const {data : accomList , isLoading , error} = useFetch('http://localhost:8080/domestic/accom');

    if(isLoading){
        return <Loading/>
    }

    if(error){
        console.log(error)
    }


    return(
    <div className="mt-[20px]">
    <Map id="map" 
         center={{lng : accomList?.[0].mapx, 
                  lat : accomList?.[0].mapy
                 }} 
         style={{width : "300px", 
                 height : "300px"}}>
                <MapMarker position={{ lng: accomList?.[0].mapx , lat : accomList?.[0].mapy}}/>
    </Map>
     {accomList?.map((accomItem : any, index : number) => 
        (
            <div className="mb-[100px]">
                <p>상호명 : {accomItem.title}</p>
                <p>전화번호 : {accomItem.tel}</p>
                <p>주소 : {accomItem.addr1} {accomItem.addr2}</p>
                {/* <p>{accomItem.addr2}</p> */}
                {/* <p>{accomItem.areacode}</p> */}
                <Image 
                    src ={accomItem.firstimage ? 
                          accomItem.firstimage : 
                          NoImageSvg 
                } 
                    alt="accom_image1"
                    width={300}
                    height={300}
                />
                
                <p>위치 : {accomItem.mapx} {accomItem.mapy}</p>
                <p>등록일자 : {convertToDateTimeFormat(accomItem.createdtime)}</p>
                <p>최종 수정일자 : {convertToDateTimeFormat(accomItem.modifiedtime)}</p>
                {/* <p>{accomItem.mapy}</p> */}
            </div>
            
            )
        )}
        
        </div>
    )
}