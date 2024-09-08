"use client"

import Image from "next/image";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import NoImageSvg from "../../../../asset/noImage.svg";
import { convertToDateTimeFormat } from "@/util/convertToDateTimeFormat";
import BackButton from "./_components/BackButton";
import ReservationButton from "./_components/ReservationButton";
import { useSuspenseQuery } from "@tanstack/react-query";
import { domesticQueryOptions } from "./_options/domesticQueryOptions";
import Loading from "@/util/components/Loading";
import ErrorPage from "@/util/components/Error";


export default function AccomDetailInfo({ contentId } : { contentId : string} ) {

  const { data : detailInfo , isPending, error, refetch } = useSuspenseQuery(domesticQueryOptions(contentId));

  if(isPending){
    return <Loading/>
  }

  if(error){
    return <ErrorPage refetch={refetch} errorMsg={error.message}/>
  }

  return (
    <>
      {detailInfo && (
        <div className="ml-[80px] mt-[20px]">
          <div className="flex justify-around">
            <div className="flex items-center gap-[40px]">
              <h2 className="text-[36px]">숙박 상세 정보</h2>
            </div>
            <BackButton/>
          </div>
          <div className="mt-[50px] gap-[20px] flex flex-col items-center justify-center">
            <div className="flex gap-[20px]">
              <div className="flex flex-col justify-center gap-[32px] p-[10px] text-[20px] mr-[36px]">
                <p>숙박업소 번호 : {detailInfo.contentid}</p>
                <p>상호명 : {detailInfo.title}</p>
                <p>전화번호 : {detailInfo.tel ? detailInfo.tel : "-"}</p>
              </div>
              <Map
                id="map"
                center={{ lng: detailInfo?.mapx, lat: detailInfo?.mapy }}
                style={{ width: "360px", height: "300px" }}
              >
                <MapMarker
                  position={{
                    lng: detailInfo?.mapx,
                    lat: detailInfo?.mapy,
                  }}
                />
              </Map>
            </div>
            <div className="flex flex-col w-1/2">
              <table className="text-[20px] text-center border-separate border-spacing-0">
                <thead>
                  <tr className="h-[52px]">
                    <td className="border-collapse border-b border-r border-black">
                      상품번호
                    </td>
                    <td className="border-collapse border-b border-r border-black">
                      유형
                    </td>
                    <td className="border-collapse border-b border-r border-black">
                      가격
                    </td>
                    <td className="border-collapse border-b border-r border-black">
                      체크인 일자
                    </td>
                    <td className="border-collapse border-b border-r border-black">
                      예약 가능 수
                    </td>
                    <td className="border-collapse border-b border-r-0 border-black">
                      예약하기
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {detailInfo.availInfo?.map((item: any, index: number) => (
                    <tr className={"h-[52px]"} key={index}>
                      <td
                        className={`border-collapse border-black border-r ${
                          index === detailInfo.availInfo.length - 1 ? "" : "border-b"
                        }`}
                      >
                        {detailInfo.contentid}
                      </td>
                      <td
                        className={`border-collapse border-black border-r ${
                          index === detailInfo.availInfo.length - 1 ? "" : "border-b"
                        }`}
                      >
                        {item.type}
                      </td>
                      <td
                        className={`border-collapse border-black border-r ${
                          index === detailInfo.availInfo.length - 1 ? "" : "border-b"
                        }`}
                      >
                        {item.price}
                      </td>
                      <td
                        className={`border-collapse border-black border-r ${
                          index === detailInfo.availInfo.length - 1 ? "" : "border-b"
                        }`}
                      >
                        {item.checkInDate}
                      </td>
                      <td
                        className={`border-collapse border-black border-r ${
                          index === detailInfo.availInfo.length - 1 ? "" : "border-b"
                        }`}
                      >
                        {item.availCount}
                      </td>
                      <td
                        className={`border-collapse border-black border-r-0 ${
                          index === detailInfo.availInfo.length - 1 ? "" : "border-b"
                        }`}
                      >
                      <ReservationButton 
                        itemId ={detailInfo.itemId} 
                        type = {detailInfo.type} 
                        price={detailInfo.price}
                        contentId={detailInfo.contentid}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="w-1/2">
              <p className="text-[32px] border-b border-green-200">이미지</p>
              <Image
                src={detailInfo?.firstimage ? detailInfo?.firstimage : NoImageSvg}
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
            <button className="w-1/4 bg-red-800 mt-[20px] w-[120px] h-[50px] text-white rounded-lg">
              예약하기
            </button>
          </div>
        </div>
      )}
    </>
  );
}