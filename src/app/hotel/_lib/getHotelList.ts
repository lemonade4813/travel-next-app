export const getHotelList = async () => {
    
    const res = await fetch('http://localhost:8080/hotel');
    
    if(!res.ok){
        throw new Error('오류가 발생했습니다.');
    }
    
    const { data }  = await res.json();

    return data;
    
}