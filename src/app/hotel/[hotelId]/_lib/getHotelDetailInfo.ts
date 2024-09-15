export const getHotelDetailInfo = async (hotelId : string) => {
    
    const res = await fetch(`http://localhost:8080/hotel/${hotelId}`);
    
    if(!res.ok){
        throw new Error('오류가 발생했습니다.');
    }
    
    const { data }  = await res.json();

    return data;
    
}