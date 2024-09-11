type Props = {
    contentId : string;
    itemId : string;
    purchaseId : string;
}

const deletePurchase = async (contentId : string, itemId : string, purchaseId : string) => {
    
    try {
    
      const response = await fetch("http://localhost:8080/domestic/accom/purchase", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contentid : contentId,
          itemId,
          purchaseId
        }),
      });

      if (!response.ok) {
        throw new Error("예약취소가 실패하였습니다.");
      }

        const result = await response.json();
        console.log(result.message);
        alert("예약취소가 성공적으로 완료되었습니다.");
    } catch (e : unknown) {
        if(e instanceof Error)
        console.log(e.message);
        alert("예약취소가 실패하였습니다. 다시 시도해주세요.");
    }
  };

export default function PurchaseDeleteButton({contentId, itemId, purchaseId} : Props){

    return(
        <button className="w-full h-[40px] bg-orange-400 rounded-md text-white"
                onClick={()=> deletePurchase(contentId, itemId, purchaseId)}
        >예약 취소하기</button>
    )
}