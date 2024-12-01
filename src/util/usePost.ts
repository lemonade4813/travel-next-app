"use client";

import { getCookie } from "cookies-next";
import { PostStatus, usePostStatus } from "./components/context/PostResultContext";
import { useRouter } from "next/navigation";

interface UsePostRequestResult {
  sendPostRequest: <T>(
    url: string,
    payload?: T,
    callback?: () => void
  ) => Promise<void>;
}

const usePostRequest = (): UsePostRequestResult => {

  const { updatePostStatus } = usePostStatus();

  const router = useRouter();

  // 상태 코드별 처리를 담당하는 함수
  const handleResponseStatus = (status: number, responseData: any) => {

    const commonAlertOptions : Partial<PostStatus>= {
      isAlertModalOpen: true,
      message : responseData.message
    };
  
    if (status === 200 || status === 201) {
      
      // 성공 또는 리소스 생성
      updatePostStatus({
        ...commonAlertOptions,
        message: commonAlertOptions.message || '처리 완료 되었습니다.',
        callback: () => router.back(),
      });
    } else if (status === 401) {

      // 인증 실패, 로그인 페이지로 이동
      updatePostStatus({
        ...commonAlertOptions,
        message: commonAlertOptions.message || '로그인이 필요합니다.',
        callback: () => router.push('/login'),
      });
    } else if (status === 500) {
      
      // 서버 오류
      updatePostStatus({
        ...commonAlertOptions,
        message: commonAlertOptions.message || '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      });
    } else {
      
      // 기타 상태 코드
      updatePostStatus({
        ...commonAlertOptions,
        message: commonAlertOptions.message || `오류가 발생했습니다: ${status}`,
      });
    }
  };

  const sendPostRequest = async <T>(
    url: string,
    payload?: T,
  ) => {
    updatePostStatus({ isPending: true });

    const headers = {
      "Content-Type": "application/json",
      "Authorization": getCookie('accessToken') ?? "",
    };

    const body = payload ? JSON.stringify(payload) : undefined;

    const response = await fetch(url, {
      method: "POST",
      headers,
      body,
    });

    const responseData = await response.json();

    // 헬퍼 함수로 상태 코드별 처리
    handleResponseStatus(response.status, responseData);

    updatePostStatus({ isPending: false });
  };

  return { sendPostRequest };
};

export default usePostRequest;




// "use client";

// import { getCookie } from "cookies-next";
// import { usePostStatus } from "./components/context/PostResultContext";

// interface UsePostRequestResult {
//   sendPostRequest: <T>(
//     url: string,
//     payload?: T,
//     callback?: () => void
//   ) => Promise<void>;
// }

// const usePostRequest = (): UsePostRequestResult => {

//   const { updatePostStatus } = usePostStatus();

//   const sendPostRequest = async <T>(
//     url: string,
//     payload?: T,
//     callback?: () => void
//   ) => {
//     updatePostStatus({ isPending: true });

//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization" : getCookie('accessToken') ?? ""
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         throw new Error(`오류가 발생했습니다. : ${response.status}`);
//       }

//       const responseData = await response.json();

//       if (callback) {
//         callback();
//       }

//       if (responseData.message) {
//         updatePostStatus({ message: responseData.message, isAlertModalOpen: true });
//       }
//     } catch (err: any) {
//       updatePostStatus({ message: err.message, isAlertModalOpen: true });
//     } finally {
//       updatePostStatus({ isPending: false });
//     }
//   };

//   return { sendPostRequest };
// };

// export default usePostRequest;