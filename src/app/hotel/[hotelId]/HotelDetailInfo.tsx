"use client"

import { useSuspenseQuery } from "@tanstack/react-query";
import { hotelDetailInfoQueryOptions } from "./_options/hotelDetailInfoQueryOptions";
import Loading from "@/util/components/Loading";
import ErrorPage from "@/util/components/Error";
import HotelSvg from "@/asset/home/hotel.svg"
import Image from "next/image";
import { API_PATH } from "@/util/apiPathConfig";

interface Offer {
  offerId: string;
  checkInDate: string;
  checkOutDate: string;
  rateCode: string;
  available: boolean;
  guests: {
    adults: number;
  };
  price: {
    currency: string;
    base: number;
    total: number;
    variations: {
      average: {
        base: number;
      };
      changes: {
        startDate: string;
        endDate: string;
        base: number;
      }[];
    };
  };
  policies: {
    cancellations: {
      description: {
        text: string;
      };
      type: string;
    }[];
    paymentType: string;
  };
}

export default function HotelDetailInfo({ hotelId }: { hotelId: string }) {
    const {
      data: hotelDetailInfo,
      error,
      isLoading,
      refetch,
    } = useSuspenseQuery(hotelDetailInfoQueryOptions(hotelId));
  
    if (isLoading) {
      return <Loading />;
    }
  
    if (error) {
      return <ErrorPage errorMsg={error.message} refetch={refetch} />;
    }
  
    const hotelName = hotelDetailInfo?.name;
    const offers: Offer[] = hotelDetailInfo?.offers;
  

    const handlePurchase = async (offerId: string) => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${API_PATH['POST']['PURCHASE_HOTEL_ITEM']}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            hotelId,
            offerId,
          }),
        });
  
        if (!response.ok) {
          throw new Error("예약 요청에 실패했습니다.");
        }
  
        alert("예약이 성공적으로 처리되었습니다.");
        location.href = '/mypage/purchase'

      } catch (e : unknown) {
        if(e instanceof Error){
        console.error(e);
        alert(e.message);
        }
      }
    };
  
    return (
      <>
        {hotelDetailInfo ? (
          <div className="container mx-auto p-4">
              <div className="flex gap-4 items-center mt-12 mb-20">
              <Image src={HotelSvg} width={32} height={32} alt="leaf img"/>
              <h2 className="leading-[36px] text-[36px]">해외 호텔 예약</h2>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
          
              <h2 className="text-3xl font-semibold mb-4">{hotelName}</h2>
              <p className="text-gray-600 mb-6">
                <strong>호텔 ID:</strong> {hotelDetailInfo.hotelId} | <strong>도시 :</strong> {hotelDetailInfo.cityCode}
              </p>
              <div className="space-y-6">
                {offers.map((offer, index) => (
                  <div key={index} className="border border-gray-300 rounded-lg p-4">
                    <h3 className="text-xl font-semibold mb-2">상품 ID: {offer.offerId}</h3>
                    <p className="text-gray-600 mb-2">
                      <strong>체크인 일자 :</strong> {offer.checkInDate} | <strong>체크아웃 일자 :</strong> {offer.checkOutDate}
                    </p>
                    <p className="text-gray-600 mb-2">
                      <strong>인원 :</strong> 성인 {offer.guests.adults} 명
                    </p>
                    <p className="text-gray-600 mb-2">
                      <strong>가격 :</strong> {offer.price.total.toFixed(2)} {offer.price.currency} (Base: {offer.price.base.toFixed(2)} {offer.price.currency})
                    </p>
                    <p className="text-gray-600 mb-2">
                      <strong>해약 규정 :</strong> {offer.policies.cancellations[0]?.description.text || "None"}
                    </p>
                    <p className="text-gray-600">
                      <strong>결제 종류 :</strong> {offer.policies.paymentType}
                    </p>
                    <button
                        className={`${
                            offer.available ? "bg-red-800" : "bg-gray-400"
                        } text-white px-4 py-2 rounded mt-4`}
                        onClick={() => handlePurchase(offer.offerId)}
                        disabled={!offer.available}
                        >
                        {offer.available ? "예약하기" : "예약완료"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }