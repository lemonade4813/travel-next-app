export async function getRecTourInfoList() {

    const res = await fetch(
        'http://api.kcisa.kr/openapi/API_CNV_061/request?serviceKey=e93f8a92-9853-43f7-b093-ea347b1225e2&numOfRows=100&pageNo=1',
        {headers : { 'Accept' : 'application/json' }}
    );
    
    if (!res.ok) {
        throw new Error('에러가 발생했습니다.');
    }

    const data = await res.json();
    return data;
   
}   