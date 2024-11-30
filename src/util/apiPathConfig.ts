export const API_PATH = {
    GET : {
        DOMESTIC_ACCOM_LIST : 'domestic/accom',
        DOMESTIC_ACOOM_DETAIL : 'domestic/accom/detail',
        FLIGHT_LIST : 'flight/offer',
        FLIGHT_DETAIL : 'flight/offer/detail',
        DOMESTIC_ACCOM_PURCHASE_INFO : 'domestic/accom/purchaseinfo',
        HOTEL_LIST :'hotel', 
        HOTEL_DETAIL : 'hotel',
        HOTEL_PURCHASE_INFO : 'hotel/purchaselist'
    },
    POST : {
        DOMESTIC_ACCOM_RESERVATION : 'domestic/accom/purchase',
        PURCHASE_HOTEL_ITEM : 'hotel/purchase',
    },
    DELETE : {
        CANCEL_ACCOM_PURCHASE : 'domestic/accom/purchase',
        CANCEL_HOTEL_PURCHASE : 'hotel/purchase'
    } 
}