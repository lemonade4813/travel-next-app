"use client"

import { useRouter } from "next/navigation"

export default function NavButton({to} : {to : string}){

    const router = useRouter();

    return(
        <button 
            className={'rounded-lg w-40 h-12 bg-red-800 text-white'}
            onClick={() => router.push(to)}
        >조회하기
        </button>
    )
}