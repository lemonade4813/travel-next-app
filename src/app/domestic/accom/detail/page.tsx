"use client"

import Loading from "@/app/flight/loading";
import { useFetch } from "@/app/util/useFetch";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation"
import { Map, MapMarker } from "react-kakao-maps-sdk"
import NoImageSvg from "../../../../asset/noImage.svg"
import { convertToDateTimeFormat } from "@/app/util/convertToDateTimeFormat";


export default function DomesticAccomDetail(){


    const router = useRouter();

    const params = useSearchParams();

    const contentId = params.get('contentid')

    const { data : detailInfo, error, isLoading } = useFetch(`http://localhost:8080/domestic/accom/detail/${contentId}`)


    if(isLoading){
        return <Loading/>
    }

    return(
    <>{detailInfo && (
        <div className="ml-[80px] mt-[20px]" >
        <div className="flex justify-around">
            <div className="flex items-center gap-[40px]">
                <h2 className="text-[36px]">숙박 상세 정보</h2>
            </div>
            <div>
                <button className="bg-red-800 w-[120px] h-[40px] text-white rounded-md" onClick={()=> router.back()}>뒤로 가기</button>
            </div>
        </div>
       <div className="mt-[50px] gap-[20px] flex flex-col items-center justify-center">
            <div className="flex gap-[20px]">
                <div className="flex flex-col justify-center gap-[32px] p-[10px] text-[20px] mr-[36px]">
                    <p>숙박업소 번호 : {detailInfo.contentid}</p>
                    <p>상호명 : {detailInfo.title}</p>
                    <p>위치 : {detailInfo.mapx} </p>
                    <p> {detailInfo.mapy}</p>
                    <p>전화번호 : {detailInfo.tel ? detailInfo.tel : '-'}</p>
                    <p>예약 비용 : 120,000 </p>
                </div>
                <Map id="map"
                     center={{lng : detailInfo?.mapx, 
                              lat : detailInfo?.mapy
                            }} 
                     style={{width : "600px",
                        height : "450px"}}>
                    <MapMarker 
                        position=
                            {{ lng: detailInfo?.mapx , 
                               lat : detailInfo?.mapy
                             }}
                     />
                </Map> 
        </div>
        <div className="w-1/2">
            <p className="text-[32px] border-b border-green-200" >이미지</p>
            <Image
                    src ={detailInfo?.firstimage ? 
                        detailInfo?.firstimage : 
                        NoImageSvg
                } 
                    alt="accom_image1"
                    width={320}
                    height={320}
                    className="rounded-md"
                />
            <div className="text-[20px] mt-[20px]">
                <p>등록일자 : {convertToDateTimeFormat(detailInfo?.createdtime)}</p>
                <p>최종 수정일자 : {convertToDateTimeFormat(detailInfo?.modifiedtime)}</p>
            </div>
        </div>
        <button className="w-1/4 bg-red-800 mt-[20px] w-[120px] h-[50px] text-white rounded-lg">예약하기</button>
        </div>
    </div>)}</> 
    )
}