import Image from "next/image"
import NoImage from "../../../asset/noImage.svg"

interface IEcoTourInfoItem {
    [key : string] : string;
}

async function getEcoTourInfoList () {
    const res = await fetch('https://apis.data.go.kr/B551011/GreenTourService1/areaBasedList1?serviceKey=GagNlrULGxksg16%2B71Pvi19nM5wOAy66KUlK5LF%2FfIXAe7fOeEPl3FyOBEJbnil91it6z5BSFNXDMxUMI9qEZg%3D%3D&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&areaCode=2&_type=json&arrange=C',
        {next : {revalidate : 0}}
    )
    return res.json();
}

export default async function EcoTourInfoList(){
    const {response : {body : {items : {item : ecoLists}}}} = await getEcoTourInfoList();

    return(
        <div>
            {ecoLists?.map((eco : IEcoTourInfoItem)=> (
                <div key={eco.contentid}>
                    <p>{eco.name}</p>
                    <p>{eco.addr}</p>
                    <p>{eco.contentid}</p>
                    <p>{eco.areacode}</p>
                    <div dangerouslySetInnerHTML={{__html : eco.summary}}/>
                    <p>{eco.createdtime}</p>
                    <Image src={eco.mainimage ? eco.mainimage : NoImage} 
                           alt="mainimage" 
                           width={300} 
                           height={300}
                    />
                </div>
            ))}
        </div>
    )
}
