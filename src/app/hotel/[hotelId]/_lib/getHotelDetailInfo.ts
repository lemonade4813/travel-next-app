export const getHotelDetailInfo = async (hotelId : string) => {
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/hotel/${hotelId}`,{next : {revalidate : 0}});
    
    if(!res.ok){
        throw new Error('오류가 발생했습니다.');
    }
    
    const { data }  = await res.json();

    return data;
    
}