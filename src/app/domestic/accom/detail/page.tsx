"use client"

import Loading from "@/app/flight/loading";
import { useFetch } from "@/app/util/useFetch";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation"
import { Map, MapMarker } from "react-kakao-maps-sdk"
import NoImageSvg from "../../../../asset/noImage.svg"

const convertToDateTimeFormat = (dateStr : string | null) => {

    if(!dateStr)
        return;

    return `${dateStr.slice(0,4)}-
            ${dateStr.slice(4,6)}-
            ${dateStr.slice(6,8)} 
            ${dateStr.slice(8,10)} : 
            ${dateStr.slice(10, 12)} : 
            ${dateStr.slice(12,14)}` 
}


export default function DomesticAccomDetail(){


    const router = useRouter();

    const params = useSearchParams();

    const contentId = params.get('contentid')

    const {data : detailInfo, error, isLoading} = useFetch(`http://localhost:8080/domestic/accom/detail/${contentId}`)


    if(isLoading){
        return <Loading/>
    }

    return(
        <div className="mt-[50px] gap-[20px] flex flex-col items-center justify-center">
            <div className="w-full flex justify-end">
                <button className="bg-red-800 w-[120px] h-[40px] text-white rounded-md" onClick={()=> router.back()}>뒤로 가기</button>
            </div>
            <div className="flex gap-[20px]">
            <h2 className="text-[20px]">◼︎ 상세 정보</h2>
                <div className="flex flex-col gap-[10px] justify-center p-[10px]">
                    <p>숙박업소 번호 : {detailInfo?.contentid}</p>
                    <p>상호명 : {detailInfo?.title}</p>
                    <p>위치 : {detailInfo?.mapx} </p>
                    <p> {detailInfo?.mapy}</p>
                    <p>전화번호 : {detailInfo?.tel}</p>
                </div>
                <Map id="map"
                     center={{lng : detailInfo?.mapx, 
                              lat : detailInfo?.mapy
                         }} 
                     style={{width : "300px",
                        height : "300px"}}>
                    <MapMarker 
                        position={{ lng: detailInfo?.mapx , 
                               lat : detailInfo?.mapy
                            }}
                     />
                </Map> 
        </div>
            <p>이미지</p>
            <Image
                    src ={detailInfo?.firstimage ? 
                        detailInfo?.firstimage : 
                        NoImageSvg
                } 
                    alt="accom_image1"
                    width={500}
                    height={500}
                    className="rounded-md"
                />
            <div className="flex gap-[10px]">
                <p>등록일자 : {convertToDateTimeFormat(detailInfo?.createdtime)}</p>
                <p>최종 수정일자 : {convertToDateTimeFormat(detailInfo?.modifiedtime)}</p>
            </div>
        </div>
    )
}