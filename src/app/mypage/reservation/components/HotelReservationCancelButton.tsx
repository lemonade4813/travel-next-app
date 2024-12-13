"use client"

import { DELETE } from '@/util/apiPathConfig';
import { isModalOpenAtom, modalMessageAtom } from '@/util/store/alertModal';
import { getCookie } from 'cookies-next';
import { useSetAtom } from 'jotai';

type Props = {
    reservationId: string;
    hotelId: string;
    offerId: string;
};

const deleteReservation = async (
    reservationId: string,
    hotelId: string,
    offerId: string,
    setModalMessage?: (message: string | null) => void,
    setModalOpen?: (open: boolean) => void
) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/${DELETE['CANCEL_HOTEL_RESERVATION']}?hotelId=${hotelId}&offerId=${offerId}&reservationId=${reservationId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${getCookie('accessToken')}`
                }
            }
        );

        if (!res.ok) {
            throw new Error("예약취소가 실패하였습니다.");
        }

        const result = await res.json();
        // setModalMessage("예약취소가 성공적으로 완료되었습니다.");
        // setModalOpen(true);
        console.log(result.message);
    } catch (e: unknown) {
        if (e instanceof Error) console.log(e.message);
        alert("예약취소가 실패하였습니다. 다시 시도해주세요.");
    }
};

export default function HotelReservationCancelButton({
    reservationId,
    hotelId,
    offerId,
}: Props) {
    // const setModalMessage = useSetAtom(modalMessageAtom);
    // const setModalOpen = useSetAtom(isModalOpenAtom);

    return (
        <button
            className="w-full h-[40px] bg-purple-500 rounded-md text-white"
            onClick={() =>
                // deleteReservation(reservationId, hotelId, offerId, setModalMessage, setModalOpen)
                deleteReservation(reservationId, hotelId, offerId)
            }
        >
            예약 취소하기
        </button>
    );
}