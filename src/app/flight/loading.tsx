import Image from 'next/image'
import spinner from '../../asset/spinner.gif'

export default function Loading(){

    return(
      
            <Image src={spinner} alt="spinner" width={50} height={50}/>
     
    )
}