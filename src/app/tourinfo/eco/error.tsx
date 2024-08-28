"use client"

interface Props {
    error : Error;
}

export default function ErrorPage({ error } : Props){

    return(
        <div className="flex justify-center items-center h-[600px] whitespace-pre-line">
            <p className="text-[24px]">{error.message}</p>
        </div>
    )

}