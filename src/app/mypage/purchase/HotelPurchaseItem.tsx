import Link from "next/link";
import HotelPurchaseDeleteButton from "./components/HotelPurchaseDeleteButton";

interface HotelPurchaseItem {
    
    purchaseId : string;
    hotelId : string;
    offerId : string;

}


export default function HotelPurchaseItem(purchaseItem : HotelPurchaseItem){

    return(
        <Link href= {`http://localhost:3000/hotel/${purchaseItem.hotelId}`}>
            <div className="mb-12 p-6 bg-gray-100 rounded-lg shadow-sm">
                <div className="flex flex-col gap-4 text-gray-700">
                    <p className="text-base">
                        <span className="text-indigo-600">구매 번호</span> | {purchaseItem.purchaseId}
                    </p>
                    <p className="text-base">
                        <span className="text-indigo-600">호텔 정보</span> | {purchaseItem.hotelId}
                    </p>
                    <p className="text-base">
                        <span className="font-medium text-indigo-600">예약 상품</span> | {purchaseItem.offerId}
                    </p>
                    <HotelPurchaseDeleteButton
                        purchaseId={purchaseItem.purchaseId}
                        hotelId={purchaseItem.hotelId}
                        offerId={purchaseItem.offerId}                               
                   />
                </div>
            </div>
        </Link>
    )
}