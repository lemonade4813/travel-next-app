"use client"

import Image from "next/image"
import NoImage from "@/asset/noImage.svg"
import { convertToDateTimeFormat } from "@/util/convertToDateTimeFormat";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ecoTourInfoListQueryOptions } from "./_options/ecoTourInfoListQueryOptions";
import Loading from "@/util/components/Loading";
import ErrorPage from "@/util/components/Error";
import { useState } from "react";
import LeafSvg from "@/asset/leaf.svg";


interface IEcoTourInfoItem {
    [key: string]: string;
}

const regions = [
  { name: "서울", code: "1" },
  { name: "강원도", code: "32" },
  { name: "제주", code: "39" },
  { name: "경상북도", code: "35" },
  { name: "경기도", code: "31" },
  { name: "경상남도", code: "36" },
  { name: "충청북도", code: "33" },
  { name: "충청남도", code: "34" },
  { name: "전라북도", code: "37" },
  { name: "전라남도", code: "38" },
];

export default async function EcoTourInfoList() {
    const [areacodes, setAreacodes] = useState<string[]>([]); 
    const { data: { response: { body: { items: { item: ecoLists } } } }, isPending, error, refetch } = useSuspenseQuery(ecoTourInfoListQueryOptions());


    if (isPending) {
        return <Loading />
    }


    if (error) {
        return <ErrorPage refetch={refetch} errorMsg={error.message} />
    }


    const filteredEcoLists = areacodes.length > 0 
        ? ecoLists.filter((eco: IEcoTourInfoItem) => areacodes.includes(eco.areacode)) 
        : ecoLists;

  
    const handleRegionClick = (code: string) => {
        setAreacodes((prev) =>
            prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
        );
    };


    return (
        <div className="p-16">
            <div className="flex mb-[50px] gap-4">
                <Image src={LeafSvg} width={32} height={32} alt="leaf img"/>
                <h2 className="leading-[36px] text-[36px]">생태 관광 정보</h2>
            </div>
            <div className="flex">
                <div className="space-y-4 w-1/5 pr-6 mr-[100px] border-pink-200 border-r-2">
                    <p className="text-[24px]">조건 필터</p>
                    <div className="border-b-2 pb-4">
                        <p className="pt-4">지역별</p>
                        <div className="grid grid-cols-2 gap-4 pt-4 place-items-center">
                        {regions.map((region) => (
                            <button
                                key={region.code}
                                onClick={() => handleRegionClick(region.code)}
                                className={`px-4 py-2 w-3/4 rounded-full border ${
                                    areacodes.includes(region.code)
                                        ? "bg-yellow-300 text-white"
                                        : "bg-gray-100 text-gray-700"        
                                }`}
                            >
                                {region.name}
                            </button>
                        ))}
                    </div>
                    </div>
                </div>
                <div className="w-4/5">
                    {filteredEcoLists?.map((eco: IEcoTourInfoItem, index: number) => (
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
    );
}