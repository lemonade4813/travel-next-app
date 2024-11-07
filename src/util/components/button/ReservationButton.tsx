"use client"

type Props = {
    disabled : boolean;
    onClick : () => void;
    buttonText : string;
}

export default function ReservationButton({ disabled, onClick } : Props){

    return(
        <button
            className={`${ !disabled ? "bg-red-800" : "bg-gray-400" } 
                            text-white 
                            px-4 
                            py-2 
                            rounded 
                            mt-4`
                       }
            onClick={onClick}
            disabled={disabled}
        >
            {!disabled ? "예약하기" : "예약완료"}
        </button>
    )

}