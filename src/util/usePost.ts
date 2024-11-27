"use client";

import { usePostStatus } from "./components/context/PostResultContext";

interface UsePostRequestResult {
  sendPostRequest: <T>(
    url: string,
    payload?: T,
    message?: string,
    callback?: () => void
  ) => Promise<void>;
}

const usePostRequest = (): UsePostRequestResult => {
    
  const { updatePostStatus} = usePostStatus();

  const sendPostRequest = async <T>(
    url: string,
    payload?: T,
    message?: string,
    callback?: () => void
  ) => {
    updatePostStatus({ isPending: true });

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

      if (callback) {
        callback();
      }

      if (responseData.message) {
        updatePostStatus({ message: responseData.message, isAlertModalOpen: true });
      }
    } catch (err: any) {
      updatePostStatus({ message: err.message, isAlertModalOpen: true });
    } finally {
      updatePostStatus({ isPending: false });
    }
  };

  return { sendPostRequest };
};

export default usePostRequest;