import { faHotel, faPlane, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Carousel from "./carousel";

export default function Home(){

    return(
    <>
    {/* <Carousel/> */}
    <div className="flex min-h-screen flex-col items-center">
      <div className="flex justify-center items-center gap-20 shadow-md round-lg border-1 bg-pink-100 border-pink-200 rounded-lg p-[30px] w-full">       
        <div className="flex justify-center items-center gap-[20px]">
          <h2 className="text-red-500 text-2xl">국내 여행</h2>
          <div className="flex justify-center gap-12 border-l-4 border-purple-200">
            <div className="flex flex-col items-center justify-center gap-4 ml-[40px]">
              <FontAwesomeIcon icon={faPlane} width={96} height={96} className="bg-[#FFD400] border-pink-100 p-[16px] rounded-lg"/>
              <p>항공편 예약</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <FontAwesomeIcon icon={faHotel} width={96} height={96} className="bg-[#FFD400] p-[16px] rounded-lg"/>
              <p>호텔 예약</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <FontAwesomeIcon icon={faUtensils} width={96} height={96} className="bg-[#FFD400] p-[16px] rounded-lg"/>
              <p>음식점 예약</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-[20px]">
          <h2 className="text-red-500 text-2xl">해외 여행</h2>
          <div className="flex justify-center gap-12 border-l-4 border-purple-200">
            <div className="flex flex-col items-center justify-center gap-4 ml-[40px]">
              <FontAwesomeIcon icon={faPlane} color="#FFF" width={96} height={96} className="bg-[#FF9913] p-[16px] rounded-lg"/>
              <p>항공편 예약</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <FontAwesomeIcon icon={faHotel} color="#FFF" width={96} height={96} className="bg-[#FF9913] p-[16px] rounded-lg"/>
              <p>호텔 예약</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>  
    )


}