import Link from "next/link";
import AccomPurchaseDeleteButton from "./components/AccomPurchaseDeleteButton";

interface AccomPurchaseItem {

    purchaseId: string;
    contentid: string;
    itemId: string;
    price: number;
    purchaseDate: string;
    type : string;
    title : string;

}



export default function AccomPurchaseItem(purchaseItem : AccomPurchaseItem){

    return(
  
        <Link href= {`http://localhost:3000/domestic/accom/${purchaseItem.contentid}`}>
           <div className="mb-12 p-6 bg-gray-100 rounded-lg shadow-sm">
               <div className="flex flex-col gap-4 text-gray-700">
                   <p className="text-lg">
                       <span className="text-indigo-600">구매 번호</span> | {purchaseItem.purchaseId}
                   </p>
                   <p className="text-lg">
                       <span className="text-indigo-600">숙박 업소</span> | {purchaseItem.title}
                   </p>
                   <p className="text-base">
                       <span className="font-medium text-indigo-600">예약 상품</span> | {purchaseItem.type}
                   </p>
                   <p className="text-base">
                       <span className="font-medium text-indigo-600">가격</span> | {purchaseItem.price.toLocaleString()}원
                   </p>
                   <p className="text-base">
                       <span className="font-medium text-indigo-600">예약 일자</span> | {new Date(purchaseItem.purchaseDate).toLocaleDateString()}
                   </p>
                   <AccomPurchaseDeleteButton
                       contentId={purchaseItem.contentid}
                       itemId={purchaseItem.itemId}
                       purchaseId={purchaseItem.purchaseId}                                
                   />
               </div>
           </div>
       </Link>
   )
}