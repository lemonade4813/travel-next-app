export const  convertToDateTimeFormat = (dateStr : string | null) => {

    if(!dateStr)
        return;

    return `${dateStr.slice(0,4)}-
            ${dateStr.slice(4,6)}-
            ${dateStr.slice(6,8)} 
            ${dateStr.slice(8,10)} : 
            ${dateStr.slice(10, 12)} : 
            ${dateStr.slice(12,14)}` 
}