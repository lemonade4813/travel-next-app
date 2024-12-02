import Link from "next/link";
import AccomPurchaseCancelButton from "./components/AccomReservationCancelButton";

interface AccomPurchaseItem {

    reservationId: string;
    contentid: string;
    itemId: string;
    price: number;
    reservationDate: string;
    type : string;
    title : string;
}


export default function AccomReservationItem(reservationItem : AccomPurchaseItem){

    return(
  
        <Link href= {`http://localhost:3000/domestic/accom/${reservationItem.contentid}`}>
           <div className="mb-12 p-6 bg-gray-100 rounded-lg shadow-sm">
               <div className="flex flex-col gap-4 text-gray-700">
                   <p className="text-lg">
                       <span className="text-indigo-600">구매 번호</span> | {reservationItem.reservationId}
                   </p>
                   <p className="text-lg">
                       <span className="text-indigo-600">숙박 업소</span> | {reservationItem.title}
                   </p>
                   <p className="text-base">
                       <span className="font-medium text-indigo-600">예약 상품</span> | {reservationItem.type}
                   </p>
                   <p className="text-base">
                       <span className="font-medium text-indigo-600">가격</span> | {reservationItem.price.toLocaleString()}원
                   </p>
                   <p className="text-base">
                       <span className="font-medium text-indigo-600">예약 일자</span> | {new Date(reservationItem.reservationId).toLocaleDateString()}
                   </p>
                   <AccomPurchaseCancelButton
                       contentId={reservationItem.contentid}
                       itemId={reservationItem.itemId}
                       reservationId={reservationItem.reservationId}                                
                   />
               </div>
           </div>
       </Link>
   )
}