import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


  class HTTPError extends Error {
    statusCode;
    constructor(statusCode: number, message?: string) {
      super(message)
      this.name = `HTTPError`
      this.statusCode = statusCode
    }
  }
  
  
  export const useFetch = (url: string) => {
    
    const router = useRouter();
    
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
  

    const fetchData = async (url: string) => {

      console.log(url)
      setIsLoading(true);
      try {

        /*const token = localStorage.getItem('token')

        // if (!token) throw new Error("Failed to get access token");

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });
        */

        const response = await fetch(url);

        if (response.ok) {
            const { data } = await response.json();
            setData(data);
        } else {
            const { error  : errorMessage } = await response.json();
            throw new HTTPError(response.status, errorMessage);
        }
      } catch (e) {
        if (e instanceof HTTPError) {
          switch (e.statusCode) {
            case 401:
              console.log("로그인이 필요합니다");
              router.push("/login");
              break;
            default:
              setError(e);
              console.error(e);
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

    const refetch = async () => {
      fetchData(url);
    };
  
    return { data, isLoading, error, refetch };
  };