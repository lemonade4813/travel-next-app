async function getRecTourInfoList() {

    const res = await fetch(
        'http://api.kcisa.kr/openapi/API_CNV_061/request?serviceKey=e93f8a92-9853-43f7-b093-ea347b1225e2&numOfRows=100&pageNo=1',
        {headers : {'Accept' : 'application/json'}}
    );
    
    if (!res.ok) {
        throw new Error('에러가 발생했습니다.');
    }

    const data = await res.json();
    return data;
   
}    


export default async function RecTourInfoList(){

    const {response : {body : {items : {item : recommendTourList}}}} = await getRecTourInfoList();


    return(
        <div className="flex justify-center items-center mt-[60px]">
            <div className="flex flex-col w-3/5 ">
                {recommendTourList?.map((rec : any) => (
                    <div className="flex flex-col border-b-2 border-gray-300 mb-[100px] pb-[60px]">
                        <div className="flex flex-col gap-[30px] mb-[100px]">
                            <p>작성자 | {rec.creator}</p>
                            <p>제목 | {rec.title}</p>
                            <p dangerouslySetInnerHTML={{ __html: rec.description }}></p>
                            <p>문의 | {rec.reference}</p>
                         </div>
                        <a target = "_blan" href={rec.url} className="text-center">
                            <button className="bg-red-700 w-[120px] h-[40px] text-white rounded-md">자세히 보기</button>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )   
}