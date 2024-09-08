"use client"

type Props = {
    itemId: string;
    type: string;
    contentId : string;
    price: number;
  };


  const handleReservation = async (itemId : string, type: string, price: number, contentId : string) => {
    try {
      const response = await fetch("http://localhost:8080/domestic/accom/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contentId,
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


  export default function ReservationButton({ itemId, type, price, contentId }: Props) {
    return (
      <button
        onClick={() => handleReservation(itemId, type, price, contentId)}
        className="bg-red-800 text-white rounded-md w-2/3"
      >
        예약
      </button>
    );
  }