import Image from "next/image"
import NoImage from "../../../asset/noImage.svg"
import { convertToDateTimeFormat } from "@/app/util/convertToDateTimeFormat";
import { XMLParser } from "fast-xml-parser";
interface IEcoTourInfoItem {
    [key : string] : string;
}


async function getEcoTourInfoList() {
    const res = await fetch('https://apis.data.go.kr/B551011/GreenTourService1/areaBasedList1?serviceKey=GagNlrULGxksg16%2B71Pvi19nM5wOAy66KUlK5LF%2FfIXAe7fOeEPl3FyOBEJbnil91it6z5BSFNXDMxUMI9qEZg%3D%3D&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&areaCode=2&_type=json&arrange=C',
        { next: { revalidate: 0 } }
    );

    const contentType = res.headers.get('content-type');
    if (contentType?.includes('application/xml') || contentType?.includes('text/xml')) {

        const text = await res.text();
        const parser = new XMLParser();
        const xmlData = parser.parse(text);

        const errorMsg = xmlData?.OpenAPI_ServiceResponse?.cmmMsgHeader?.returnAuthMsg;

        throw new Error(`데이터를 불러오는데 실패했습니다.\n 잠시후에 다시 시도해주시기 바랍니다.\n Error : ${errorMsg}`)
      
    }

    return res.json();
}

export default async function EcoTourInfoList(){
    const {response : {body : {items : {item : ecoLists}}}} = await getEcoTourInfoList();

    return(
        <div className="p-[100px]">
            <h2 className="text-[36px] mb-[50px]">생태 관광 정보</h2>
            <div className="flex">
                <div className="space-y-4 w-[800px] pr-6 mr-[100px] border-pink-200 border-r-2">
                    <p className="text-[24px]">조건 필터</p>
                    <div className="border-b-2 pb-4">
                        <p className="pt-4 border-b-2">지역별</p>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center pt-4">
                                <input id="checkbox1" type="checkbox" className="form-checkbox h-5 w-5 accent-yellow-300 rounded border-sky-300 focus:ring-sky-500 focus:ring-2"/>
                                <label htmlFor="checkbox1" className="ml-2 text-gray-700">서울</label>
                            </div>
                            <div className="flex items-center">
                                <input id="checkbox2" type="checkbox" className="form-checkbox h-5 w-5 accent-yellow-300 rounded border-sky-300 focus:ring-sky-500 focus:ring-2"/>
                                <label htmlFor="checkbox2" className="ml-2 text-gray-700">경기도</label>
                            </div>
                            <div className="flex items-center">
                                <input id="checkbox3" type="checkbox" className="form-checkbox h-5 w-5 accent-yellow-300 rounded border-sky-300 focus:ring-sky-500 focus:ring-2"/>
                                <label htmlFor="checkbox3" className="ml-2 text-gray-700">강원도</label>
                            </div>
                            <div className="flex items-center">
                                <input id="checkbox4" type="checkbox" className="form-checkbox h-5 w-5 accent-yellow-300 rounded border-sky-300 focus:ring-sky-500 focus:ring-2"/>
                                <label htmlFor="checkbox4" className="ml-2 text-gray-700">충청도</label>
                            </div>
                            <div className="flex items-center">
                                <input id="checkbox5" type="checkbox" className="form-checkbox h-5 w-5 accent-yellow-300 rounded border-sky-300 focus:ring-sky-500 focus:ring-2"/>
                                <label htmlFor="checkbox5" className="ml-2 text-gray-700">전라도</label>
                            </div>
                            <div className="flex items-center">
                                <input id="checkbox6" type="checkbox" className="form-checkbox h-5 w-5 accent-yellow-300 rounded border-sky-300 focus:ring-sky-500 focus:ring-2"/>
                                <label htmlFor="checkbox6" className="ml-2 text-gray-700">경상도</label>
                            </div>
                            <div className="flex items-center">
                                <input id="checkbox6" type="checkbox" className="form-checkbox h-5 w-5 accent-yellow-300 rounded border-sky-300 focus:ring-sky-500 focus:ring-2"/>
                                <label htmlFor="checkbox6" className="ml-2 text-gray-700">제주</label>
                            </div>
                        </div>
                    </div>
            </div>
            <div>
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
        </div>
        </div>
    )
}
