"use client"

import { requestPay } from "@/util/requestPay";
import { getCookie } from "cookies-next";

type Props = {
    itemId: string;
    type: string;
    contentId : string;
    price: number;
    title : string;
    checkInDate : string;
  };

  

  const handleReservation = async (itemId : string, 
                                   type: string, 
                                   price: number, 
                                   contentId : string, 
                                   title : string,
                                   checkInDate : string
                                   ) => {
      
    // try {
    //   console.log(JSON.stringify({
    //     contentid : contentId,
    //     itemId,
    //     type,
    //     price,
    //     title,
    //     checkInDate
    //   }))


    //   const response = await fetch("http://localhost:8080/domestic/accom/purchase", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Authorization" : `Bearer ${getCookie('accessToken')}`
    //     },
    //     body: JSON.stringify({
    //       contentid : contentId,
    //       itemId,
    //       type,
    //       price,
    //       title,
    //       checkInDate
    //     }),
    //   });

    //   if (!response.ok) {
    //     throw new Error("숙박 예약에 실패하였습니다.");
    //   }

    //     const result = await response.json();
    //     console.log(result.message);
    //     location.href ='/mypage/purchase'
    //     alert("예약이 성공적으로 완료되었습니다.");
    // } catch (e : unknown) {
    //     if(e instanceof Error)
    //     console.log(e.message);
    //     alert("예약에 실패하였습니다. 다시 시도해주세요.");
    // }

      requestPay(price, title);
      
  };


  export default function ReservationButton({ itemId, type, price, contentId, title, checkInDate }: Props) {
    
    return (
      <button
        onClick={() => handleReservation(itemId, type, price, contentId, title, checkInDate)}
        className="bg-red-800 text-white rounded-md w-2/3"
      >
        예약
      </button>
    );
  }