export const getHotelList = async () => {
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/hotel`);
    
    if(!res.ok){
        throw new Error('오류가 발생했습니다.');
    }
    
    const { data }  = await res.json();

    return data;
    
}