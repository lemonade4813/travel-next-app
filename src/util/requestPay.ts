declare const window : typeof globalThis & {
    IMP : any;
  }


export const requestPay = (amount : number, name : string) => {
    
    const { IMP } = window; 
  
    IMP.init(process.env.NEXT_PUBLIC_MERCHANT_ID);

    IMP.request_pay(
      {
        pg : 'html5_inicis',
        pay_method : 'card',
        amount,
        name
      }
    )
  }