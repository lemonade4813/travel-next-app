"use client"

type Props = { 
    errorMsg : string, 
    refetch : () => void
}


export default function ErrorPage({ errorMsg, refetch } : Props ){

    return(
        <div className="flex flex-col justify-center items-center h-[600px] gap-20">
            <div className="whitespace-pre-line">
                <p className="text-[24px]">{errorMsg}</p>
            </div>
            <button onClick={refetch} className="bg-red-700 rounded-md text-white h-[40px] w-[120px]">다시 조회하기</button>
        </div>
    )
}