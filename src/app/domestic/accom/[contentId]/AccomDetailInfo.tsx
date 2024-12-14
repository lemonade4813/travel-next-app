"use client";

import Image from "next/image";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import NoImageSvg from "@/asset/noImage.svg";
import { convertToDateTimeFormat } from "@/util/convertToDateTimeFormat";
import BackButton from "./_components/BackButton";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { domesticQueryOptions } from "./_options/domesticQueryOptions";
import Loading from "@/util/components/Loading";
import ErrorPage from "@/util/components/Error";
import HotelSvg from "@/asset/home/hotel.svg"
import usePostRequest from "@/util/usePost";
import { GET, POST } from "@/util/apiPathConfig";
import { useRouter } from "next/navigation";
import { requestPay } from "@/util/requestPay";


export default function AccomDetailInfo({ contentId }: { contentId: string }) {

  const router = useRouter();

  const queryClient = useQueryClient();

  const { sendPostRequest } = usePostRequest();
  
  const {
    data: detailInfo,
    isPending,
    error,
    refetch,
  } = useSuspenseQuery(domesticQueryOptions(contentId));

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage refetch={refetch} errorMsg={error.message} />;
  }


  const handlePay = (price : number, itemName : string) => requestPay(price, itemName);

  const onPostSuccessCallback = () => {
    queryClient.invalidateQueries({queryKey: ['domesticAccomList']})
    router.push(GET['DOMESTIC_ACCOM_LIST']);
  }
  
  return (
    <>
      {detailInfo && (
        <div className="ml-[80px] mt-[20px]">
          <div className="flex justify-between items-center mt-8 mb-32 gap-4">
            <div className="flex gap-4 justify-between items-center">
              <Image src={HotelSvg} width={32} height={32} alt="leaf img"/>
              <h2 className="leading-[36px] text-[36px]">국내 숙소 예약 상세</h2>
            </div>
            <BackButton />
          </div>

          <div className="mt-[40px] gap-[40px] flex justify-start">
            <div className="flex flex-col gap-[20px] text-[18px]">
              <p><span className="font-semibold">숙박업소 번호:</span> {detailInfo.contentid}</p>
              <p><span className="font-semibold">상호명:</span> {detailInfo.title}</p>
              <p><span className="font-semibold">전화번호:</span> {detailInfo.tel ? detailInfo.tel : "-"}</p>
            </div>
            <Map
              id="map"
              center={{ lng: detailInfo?.mapx, lat: detailInfo?.mapy }}
              style={{ width: "360px", height: "300px", borderRadius: "12px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
            >
              <MapMarker
                position={{
                  lng: detailInfo?.mapx,
                  lat: detailInfo?.mapy,
                }}
              />
            </Map>
          </div>

          <div className="flex flex-col items-center mt-[40px] w-full">
            <table className="w-full text-[18px] text-center border-separate border-spacing-0">
              <thead>
                <tr className="h-[52px] bg-gray-100">
                  <th className="border-collapse border-b border-r border-gray-300 p-2">상품번호</th>
                  <th className="border-collapse border-b border-r border-gray-300 p-2">유형</th>
                  <th className="border-collapse border-b border-r border-gray-300 p-2">가격</th>
                  <th className="border-collapse border-b border-r border-gray-300 p-2">체크인 일자</th>
                  <th className="border-collapse border-b border-r border-gray-300 p-2">예약 가능 수</th>
                  <th className="border-collapse border-b border-gray-300 p-2">예약하기</th>
                </tr>
              </thead>
              <tbody>
                {detailInfo.availInfo?.map((item: any, index: number) => (
                  <tr
                    className={`h-[52px] ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                    key={index}
                  >
                    <td className="border-collapse border-gray-300 border-r p-2">
                      {detailInfo.contentid}
                    </td>
                    <td className="border-collapse border-gray-300 border-r p-2">
                      {item.type}
                    </td>
                    <td className="border-collapse border-gray-300 border-r p-2">
                      {item.price.toLocaleString()}
                    </td>
                    <td className="border-collapse border-gray-300 border-r p-2">
                      {item.checkInDate}
                    </td>
                    <td className="border-collapse border-gray-300 border-r p-2">
                      {item.availCount}
                    </td>
                    <td className="border-collapse border-gray-300 p-2">
                       <button
                          onClick={() => 
                                    sendPostRequest(
                                      POST['DOMESTIC_ACCOM_RESERVATION'],
                                      {
                                        itemId : item.id,
                                        type : item.type,
                                        price : item.price,
                                        contentId : detailInfo.contentid,
                                        title : detailInfo.title,
                                        checkInDate : item.checkInDate
                                      },
                                      ()=>{
                                            handlePay(item.price, detailInfo.title);
                                            onPostSuccessCallback();
                                      }
                                  )}
                          className="bg-red-800 text-white rounded-md w-2/3"
                        >
                          예약
                        </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="w-3/4 mt-[40px]">
            <p className="text-[24px] border-b border-green-200 mb-[20px]">이미지</p>
            <Image
              src={detailInfo?.firstimage ? detailInfo?.firstimage : NoImageSvg}
              alt="accom_image1"
              width={320}
              height={320}
              className="rounded-lg shadow-md"
            />
            <div className="text-[18px] mt-[20px]">
              <p><span className="font-semibold">등록일자:</span> {convertToDateTimeFormat(detailInfo?.createdtime)}</p>
              <p><span className="font-semibold">최종 수정일자:</span> {convertToDateTimeFormat(detailInfo?.modifiedtime)}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}