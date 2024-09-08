"use client"

import Image from "next/image"
import NoImageSvg from "../../../asset/noImage.svg"
import Link from "next/link"
import { useSuspenseQuery } from "@tanstack/react-query"
import { domesticListQueryOptions } from "./_options/domesticAccomListOptions"
import Loading from "@/util/components/Loading"
import ErrorPage from "@/util/components/Error"


export default async function AccomList(){

    const {data : accomList , isPending, error, refetch } = useSuspenseQuery(domesticListQueryOptions());

    if(isPending){
        return <Loading/>
    }

    if(error){
        return <ErrorPage refetch={refetch} errorMsg={error.message}/>
    }

    return(
    <div className="mt-[40px] flex flex-col items-center">
        {accomList?.map((accomItem : any) => 
        (
            <Link href={`/domestic/accom/${accomItem.contentid}`}>
            <div className="mb-[100px] flex gap-2">
                <div className="flex flex-col gap-4 w-[800px]">
                    <p>업소 번호 : {accomItem.contentid}</p>
                    <p>상호명 : {accomItem.title}</p>
                    <p>전화번호 : {accomItem.tel}</p>
                    <p>주소 : {accomItem.addr1} {accomItem.addr2}</p>
                </div>
                <Image
                    src ={accomItem.firstimage ? 
                          accomItem.firstimage : 
                          NoImageSvg 
                } 
                    alt="accom_image1"
                    width={160}
                    height={160}
                    className="rounded-xl"
                />
            </div>
            </Link>
            )
        )}
    </div>
    )
}