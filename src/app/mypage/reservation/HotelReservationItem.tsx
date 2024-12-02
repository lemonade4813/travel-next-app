import Link from "next/link";
import HotelPurchaseDeleteButton from "./components/HotelReservationCancelButton";

interface IHotelResertvationItem {
    
    reservationId : string;
    hotelId : string;
    offerId : string;

}


export default function HotelReservationItem(reservationItem : IHotelResertvationItem){

    return(
        <Link href= {`http://localhost:3000/hotel/${reservationItem.hotelId}`}>
            <div className="mb-12 p-6 bg-gray-100 rounded-lg shadow-sm">
                <div className="flex flex-col gap-4 text-gray-700">
                    <p className="text-base">
                        <span className="text-indigo-600">구매 번호</span> | {reservationItem.reservationId}
                    </p>
                    <p className="text-base">
                        <span className="text-indigo-600">호텔 정보</span> | {reservationItem.hotelId}
                    </p>
                    <p className="text-base">
                        <span className="font-medium text-indigo-600">예약 상품</span> | {reservationItem.offerId}
                    </p>
                    <HotelPurchaseDeleteButton
                        reservationId={reservationItem.reservationId}
                        hotelId={reservationItem.hotelId}
                        offerId={reservationItem.offerId}                               
                   />
                </div>
            </div>
        </Link>
    )
}