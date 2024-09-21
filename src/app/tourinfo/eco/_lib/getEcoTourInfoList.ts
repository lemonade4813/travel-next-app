import { XMLParser } from "fast-xml-parser";

export async function getEcoTourInfoList() {
    const res = await fetch('https://apis.data.go.kr/B551011/GreenTourService1/areaBasedList1?serviceKey=GagNlrULGxksg16%2B71Pvi19nM5wOAy66KUlK5LF%2FfIXAe7fOeEPl3FyOBEJbnil91it6z5BSFNXDMxUMI9qEZg%3D%3D&numOfRows=1000&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&arrange=C',
        { next: { revalidate: 0 } }
    );

    const contentType = res.headers.get('content-type');
    if (contentType?.includes('application/xml') || contentType?.includes('text/xml')) {

        const text = await res.text();
        const parser = new XMLParser();
        const xmlData = parser.parse(text);

        const errorMsg = xmlData?.OpenAPI_ServiceResponse?.cmmMsgHeader?.returnAuthMsg;

        throw new Error(`데이터를 불러오는데 실패했습니다.\n 잠시후에 다시 시도해주시기 바랍니다.\n Error : ${errorMsg}`)
      
    }

    return res.json();
}