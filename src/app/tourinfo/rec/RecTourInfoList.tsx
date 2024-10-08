"use client"

import { useSuspenseQuery } from "@tanstack/react-query"
import { recTourInfoListQueryOptions } from "./_options/recTourInfoListQueryOptions"
import Loading from "@/util/components/Loading";
import ErrorPage from "@/util/components/Error";
import Image from "next/image";
import ThumbsUpSvg from "@/asset/thumbsUp.svg";
 
export default function RecTourInfoList(){

    const { data : 
                { response : 
                    { body : 
                            {   items : 
                                {   item : recommendTourList }
                            }
                        }
                    }
                , isPending
                , error
                , refetch
                
            } = useSuspenseQuery(recTourInfoListQueryOptions());

    if(isPending){
        return <Loading/>
    }        

    if(error){
        return <ErrorPage errorMsg={error.message} refetch={refetch}/>
    }


    return(
        <div className="flex justify-center items-center mt-[60px]">
            <div className="flex flex-col w-3/5 ">
            <div className="flex mb-[50px] gap-4">
                <Image src={ThumbsUpSvg} width={32} height={32} alt="leaf img"/>
                <h2 className="leading-[36px] text-[36px]">문화체육관광부 추천 여행지</h2>
            </div>
                {recommendTourList?.map((rec : any, index : number) => (
                    <div key={index} className="flex flex-col border-b-2 border-gray-300 mb-[100px] pb-[60px]">
                        <div className="flex flex-col gap-[30px] mb-[100px]">
                            <p>작성자 | {rec.creator}</p>
                            <p>제목 | {rec.title}</p>
                            <p dangerouslySetInnerHTML={{ __html: rec.description }}></p>
                            <p>문의 | {rec.reference}</p>
                         </div>
                        <a target = "_blan" href={rec.url} className="text-center">
                            <button className="bg-red-700 w-[120px] h-[40px] text-white rounded-md">자세히 보기</button>
                        </a>
                        
                    </div>
                ))}
            </div>
        </div>
    )   
}