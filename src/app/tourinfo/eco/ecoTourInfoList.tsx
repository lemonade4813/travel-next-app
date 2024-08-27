import Image from "next/image"
import NoImage from "../../../asset/noImage.svg"
import { convertToDateTimeFormat } from "@/app/util/convertToDateTimeFormat";

interface IEcoTourInfoItem {
    [key : string] : string;
}

async function getEcoTourInfoList () {
    const res = await fetch('https://apis.data.go.kr/B551011/GreenTourService1/areaBasedList1?serviceKey=GagNlrULGxksg16%2B71Pvi19nM5wOAy66KUlK5LF%2FfIXAe7fOeEPl3FyOBEJbnil91it6z5BSFNXDMxUMI9qEZg%3D%3D&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&areaCode=2&_type=json&arrange=C',
        {next : {revalidate : 0}}
    )
    return res.json();
}

export default async function EcoTourInfoList(){
    const {response : {body : {items : {item : ecoLists}}}} = await getEcoTourInfoList();

    return(
        <div className="p-[100px]">
            <h2 className="text-[36px] mb-[20px]">생태 관광 정보</h2>
            {ecoLists?.map((eco : IEcoTourInfoItem, index : number)=> (
                <div key={eco.contentid} className="mb-[80px]">
                    <h2 className="text-[30px] mb-[40px]">{index + 1}. {eco.title}</h2>
                    <div className="flex flex-col gap-[20px] mb-[30px]">   
                        <p className="border-r-4 border-pink-500 w-[100px] text-[24px]">주소</p>
                        <p className="pl-6">{eco.addr}</p>
                    </div>
                    <div className="flex flex-col gap-[20px] mb-[40px]">
                      <p className="border-r-4 border-pink-500 w-[100px] text-[24px]">소개</p>
                        {eco.summary.split(/\n+/).map((text, i) => (
                            <p className="pl-6 leading-relaxed" key={i} dangerouslySetInnerHTML={{ __html: text }}></p>
                        ))}
                    </div>
                    <div className="relative w-[300px] h-[300px]">
                        <Image
                            src={eco.mainimage ? eco.mainimage : NoImage}
                            alt="mainimage"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-xl"
                        />
                        {!eco.mainimage && (
                            <span className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50 rounded-xl">
                            이미지 없음
                            </span>
                        )}
                        </div>
                    <div className="flex flex-col gap-[30px] mt-[20px]">
                        <p className="border-r-4 border-pink-500 w-[200px] text-[24px]">최종 업데이트 일자</p>
                        <p className="pl-6">{convertToDateTimeFormat(eco.createdtime)}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
