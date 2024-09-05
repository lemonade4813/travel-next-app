"use client"

import Loading from "@/app/flight/loading";
import { useFetch } from "@/app/util/useFetch";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import NoImageSvg from "../../../../asset/noImage.svg";
import { convertToDateTimeFormat } from "@/app/util/convertToDateTimeFormat";

export default function DomesticAccomDetail() {
  const router = useRouter();
  const params = useSearchParams();
  const contentId = params.get("contentid");

  const { data: detailInfo, error, isLoading } = useFetch(
    `http://localhost:8080/domestic/accom/detail/${contentId}`
  );


  const handleReservation = async (itemId : string, type: string, price: number) => {
    try {
      const response = await fetch("http://localhost:8080/domestic/accom/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contentid: detailInfo.contentid, // from detailInfo
          itemId,
          type,
          price,
        }),
      });

      if (!response.ok) {
        throw new Error("숙박 예약에 실패하였습니다.");
      }

        const result = await response.json();
        console.log(result.message);
        alert("예약이 성공적으로 완료되었습니다.");
    } catch (e : unknown) {
        if(e instanceof Error)
        console.log(e.message);
        alert("예약에 실패하였습니다. 다시 시도해주세요.");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  
  return (
    <>
      {detailInfo && (
        <div className="ml-[80px] mt-[20px]">
          <div className="flex justify-around">
            <div className="flex items-center gap-[40px]">
              <h2 className="text-[36px]">숙박 상세 정보</h2>
            </div>
            <div>
              <button
                className="bg-red-800 w-[120px] h-[40px] text-white rounded-md"
                onClick={() => router.back()}
              >
                뒤로 가기
              </button>
            </div>
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
                        <button
                          onClick={() => handleReservation(item.itemId, item.type, item.price)}
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