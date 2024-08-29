"use client"

interface Props {
    error : Error;
    reset : () => void;
}

export default function ErrorPage({ error, reset } : Props){

    return(
        <div className="flex flex-col justify-center items-center h-[600px] gap-20">
            <div className=" whitespace-pre-line">
                <p className="text-[24px]">{error.message}</p>
            </div>
            <button onClick={reset} className="bg-red-700 rounded-md text-white h-[40px] w-[120px]">다시 조회하기</button>
        </div>
    )

}