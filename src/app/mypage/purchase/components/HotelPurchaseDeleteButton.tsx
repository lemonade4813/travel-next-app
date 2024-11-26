"use client"

import { isModalOpenAtom, modalMessageAtom } from '@/util/store/alertModal';
import { getCookie } from 'cookies-next';
import { useSetAtom } from 'jotai';

type Props = {
    purchaseId: string;
    hotelId: string;
    offerId: string;
};

const deletePurchase = async (
    purchaseId: string,
    hotelId: string,
    offerId: string,
    setModalMessage?: (message: string | null) => void,
    setModalOpen?: (open: boolean) => void
) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/hotel/purchase?hotelId=${hotelId}&offerId=${offerId}&purchaseId=${purchaseId}`,
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

export default function HotelPurchaseDeleteButton({
    purchaseId,
    hotelId,
    offerId,
}: Props) {
    // const setModalMessage = useSetAtom(modalMessageAtom);
    // const setModalOpen = useSetAtom(isModalOpenAtom);

    return (
        <button
            className="w-full h-[40px] bg-purple-500 rounded-md text-white"
            onClick={() =>
                // deletePurchase(purchaseId, hotelId, offerId, setModalMessage, setModalOpen)
                deletePurchase(purchaseId, hotelId, offerId)
            }
        >
            예약 취소하기
        </button>
    );
}