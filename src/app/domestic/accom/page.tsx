"use client"

import Image from "next/image"
import { useFetch } from "@/app/util/useFetch"
import Loading from "@/app/flight/loading"
import NoImageSvg from "../../../asset/noImage.svg"

import { useRouter } from "next/navigation"


export default function DomesticAccom(){


    const router = useRouter();

    const {data : accomList , isLoading , error} = useFetch('http://localhost:8080/domestic/accom');

    if(isLoading){
        return <Loading/>
    }

    if(error){
        return <div className="flex justify-center items-center min-h-screen">{error.message}</div>
    }


    return(
    <div className="mt-[40px] flex flex-col items-center">
     {accomList?.map((accomItem : any, index : number) => 
        (
            <div className="mb-[100px] flex gap-2" 
                 onClick={()=> router.push(`/domestic/accom/detail?contentid=${accomItem.contentid}`)}>
                <div className="flex flex-col gap-4 w-[800px]">
                    <p>업소 번호 : {accomItem.contentid}</p>
                    <p>상호명 : {accomItem.title}</p>
                    <p>전화번호 : {accomItem.tel}</p>
                    <p>주소 : {accomItem.addr1} {accomItem.addr2}</p>
                    {/* <p>{accomItem.addr2}</p> */}
                    {/* <p>{accomItem.areacode}</p> */}
                    
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
                {/* <p>{accomItem.mapy}</p> */}
            </div>
            
            )
        )}
        
        </div>
    )
}