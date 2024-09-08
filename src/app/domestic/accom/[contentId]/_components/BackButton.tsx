"use client"

import { useRouter } from "next/navigation"


export default function BackButton(){

    const router = useRouter();

    return(
        <button
            className="bg-red-800 w-[120px] h-[40px] text-white rounded-md"
            onClick={() => router.back()}
            >
            뒤로 가기
        </button>
    )
}