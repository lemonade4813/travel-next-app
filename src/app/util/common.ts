import { useEffect, useState } from "react";

const AMADEUS_API_KEY = 'obCv6RoAxEq0IdbHANdGncCabaugPCwU'
const AMADEUS_SECRET_KEY = 'DDOBeUcEConOZYQG'


// export const setAmadeusAccessToken = async () =>{

    
//     const amadeusAccessToken  =  await getAmadeusAccessToken()
//     if(typeof amadeusAccessToken === 'string')
//     localStorage.setItem("amadeusToken", amadeusAccessToken)
  
  
//     return localStorage.getItem("amadeusToken")
  
//   }
  
  export const removeAmadeusAccessToken = () => {
    localStorage.removeItem("amadeusToken")
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
  
  
  export const useAxios = (url: string) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
  

    const fetchData = async (url: string) => {

      console.log(url)
      setIsLoading(true);
      try {

        const token = localStorage.getItem('accessToken')

        console.log(token)

        if (!token) throw new Error("Failed to get access token");
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Origin': 'http://192.168.45.127',
          }
        });

        if (response.ok) {
          const data = await response.json();
          setData(data);
        } else {
          console.log(response.status)
          throw new HTTPError(response.status, response.statusText);
        }
      } catch (err) {
        if (err instanceof HTTPError) {
          switch (err.statusCode) {
            case 401:
              removeAmadeusAccessToken();
              getAmadeusAccessToken();
              fetchData(url);
              break;
            default:
              console.error(err);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };
    useEffect(() => {
      
      fetchData(url);
  
      // Cleanup function to cancel fetch if component unmounts
      return () => {
        // Cleanup logic here if needed
      };
    }, [url]);
  
    return { data, isLoading, error };
  };