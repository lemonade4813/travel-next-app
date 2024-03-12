const AMADEUS_API_KEY = 'obCv6RoAxEq0IdbHANdGncCabaugPCwU'
const AMADEUS_SECRET_KEY = 'DDOBeUcEConOZYQG'


export const setAmadeusAccessToken = async () =>{

  
    if(!localStorage.getItem("amadeusAccessToken"))
    removeAmadeusAccessToken(); 
  
  
    const amadeusAccessToken  =  await getAmadeusAccessToken()
    if(typeof amadeusAccessToken === 'string')
    localStorage.setItem("amadeusAccessToken", amadeusAccessToken)
  
  
    return localStorage.getItem("amadeusAccessToken")
  
  }
  
  export const removeAmadeusAccessToken = () => {
    localStorage.removeItem("amadeusAccessToken")
  }



export const getAmadeusAccessToken = async () : Promise<void> => {
        
    try{
        const responseAuth = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token",
        {
            body: `grant_type=client_credentials&client_id=${AMADEUS_API_KEY}&client_secret=${AMADEUS_SECRET_KEY}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST"
        })
        const responseAuthJson = await responseAuth.json() 
        // return responseAuthJson.access_token
        localStorage.setItem("accessToken", responseAuthJson.access_token)
        
    }
    catch(e : unknown){
        if(e instanceof Error)
        console.log(e.message)
    }
  }

  class HTTPError extends Error {
    statusCode;
    constructor(statusCode: number, message?: string) {
      super(message)
      this.name = `HTTPError`
      this.statusCode = statusCode
    }
  }
  
  
  export const fetchData = async (e: React.FormEvent<HTMLFormElement>, url : string) => {
  
    e.preventDefault();
  
    await setAmadeusAccessToken();
  
    const token = localStorage.getItem("amadeusAccessToken")
  
    try{
      const response = await fetch(url,{   
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          if (response.ok) {
            return await response.json()
          } else {
            throw new HTTPError(response.status, response.statusText)
        }
      } catch(err){
          if(err instanceof HTTPError)
            switch(err.statusCode){
              case 401:
                alert("인증 오류 발생, 다시 시도해 주십시오")
                break;
              default : 
                console.log(err);
          }
    }
  }
  