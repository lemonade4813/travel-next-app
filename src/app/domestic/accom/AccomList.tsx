"use client"

import Image from "next/image"
import NoImageSvg from "@/asset/noImage.svg"
import Link from "next/link"
import { useSuspenseQuery } from "@tanstack/react-query"
import { domesticListQueryOptions } from "./_options/domesticAccomListOptions"
import Loading from "@/util/components/Loading"
import ErrorPage from "@/util/components/Error"
import HotelSvg from "@/asset/home/hotel.svg"


export default function AccomList() {

    const { data: accomList, isPending, error, refetch } = useSuspenseQuery(domesticListQueryOptions());

    if (isPending) {
        return <Loading />
    }

    if (error) {
        return <ErrorPage refetch={refetch} errorMsg={error.message} />
    }

    return (
        <div className="mt-10">
            <div className="flex gap-4 items-center mb-20">
              <Image src={HotelSvg} width={32} height={32} alt="leaf img"/>
              <h2 className="leading-[36px] text-[36px]">국내 숙소 예약</h2>
            </div>
            <div className="flex flex-col items-center">
            {accomList?.map((accomItem: any) => (
                <Link key={accomItem.contentid} href={`/domestic/accom/${accomItem.contentid}`} className="mb-10 w-full max-w-lg">
                    <div className="flex gap-4 p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
                        <div className="flex flex-col justify-between flex-grow">
                            <div>
                                <p className="font-bold text-lg">{accomItem.title}</p>
                                <p className="text-gray-500">{accomItem.addr1} {accomItem.addr2}</p>
                                <p className="text-gray-600">{accomItem.tel}</p>
                            </div>
                            <p className="text-gray-400">숙박 업소 번호 {accomItem.contentid}</p>
                        </div>
                        <Image
                            src={accomItem.firstimage ? accomItem.firstimage : NoImageSvg}
                            alt="Accommodation Image"
                            width={160}
                            height={160}
                            className="rounded-lg object-cover"
                        />
                    </div>
                </Link>
            ))}
        </div>
        </div>
    )
}