import Image from 'next/image'
import spinner from '../../asset/spinner.gif'

export default function Loading(){

    return(
        <div>
            <Image src={spinner} alt="spinner"/>
        </div>
    )
}