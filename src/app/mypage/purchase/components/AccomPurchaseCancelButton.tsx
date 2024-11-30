"use client"

import { API_PATH } from '@/util/apiPathConfig';
import { isModalOpenAtom, modalMessageAtom } from '@/util/store/alertModal';
import { getCookie } from 'cookies-next';
import { useSetAtom } from 'jotai';

type Props = {
    contentId: string;
    itemId: string;
    purchaseId: string;
};

const deletePurchase = async (
    contentId: string,
    itemId: string,
    purchaseId: string,
    setModalMessage: (message: string | null) => void,
    setModalOpen: (open: boolean) => void
) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/${API_PATH['DELETE']['CANCEL_ACCOM_PURCHASE']}?contentid=${contentId}&itemId=${itemId}&purchaseId=${purchaseId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${getCookie('accessToken')}`
                },
                body: JSON.stringify({
                    contentid: contentId,
                    itemId,
                    purchaseId,
                }),
            }
        );

        if (!res.ok) {
            throw new Error("예약취소가 실패하였습니다.");
        }

        const result = await res.json();
        setModalMessage("예약취소가 성공적으로 완료되었습니다.");
        setModalOpen(true);
        console.log(result.message);
    } catch (e: unknown) {
        if (e instanceof Error) console.log(e.message);
        alert("예약취소가 실패하였습니다. 다시 시도해주세요.");
    }
};

export default function AccomPurchaseDeleteButton({
    contentId,
    itemId,
    purchaseId,
}: Props) {
    const setModalMessage = useSetAtom(modalMessageAtom);
    const setModalOpen = useSetAtom(isModalOpenAtom);

    return (
        <button
            className="w-full h-[40px] bg-orange-400 rounded-md text-white"
            onClick={() =>
                deletePurchase(contentId, itemId, purchaseId, setModalMessage, setModalOpen)
            }
        >
            예약 취소하기
        </button>
    );
}