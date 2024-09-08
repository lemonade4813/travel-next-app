import Image from 'next/image'
import spinner from '../../asset/spinner.gif'

export default function Loading(){

    return(
        <div className='flex min-h-screen flex-col items-center justify-between p-24'>
            <Image src={spinner} alt="spinner" width={50} height={50}/>
        </div>
    )
}