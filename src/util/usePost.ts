"use client"

import { useState } from "react";

interface UsePostRequestResult {
    sendPostRequest: <T>(
      url: string,
      payload?: T,
      message? : string, 
      callback?: () => void
    ) => Promise<void>;
  }

const usePostRequest = (): UsePostRequestResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const sendPostRequest = async <T>(url: string, payload?: T, message? : string, callback?: () => void) => {

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`오류가 발생했습니다. : ${response.status}`);
      }

      const responseData = await response.json();
      setData(responseData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { sendPostRequest };
};

export default usePostRequest;
