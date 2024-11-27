"use client";

import React, { createContext, useContext, useState } from "react";

// 타입 정의
interface PostStatus {
  isPending: boolean; // 요청 진행 여부
  message: string; // 상태 메시지
  callback: (() => void) | null; // 완료 후 실행될 콜백
  isAlertModalOpen: boolean; // 알림 모달 표시 여부
}

// 초기값
const initialPostStatus: PostStatus = {
  isPending: false,
  message: "",
  callback: null,
  isAlertModalOpen: false,
};

// 컨텍스트 타입 정의
interface PostStatusContextType extends PostStatus {
  updatePostStatus: (status: Partial<PostStatus>) => void;
  resetPostStatus: () => void;
}

// 컨텍스트 생성
const PostStatusContext = createContext<PostStatusContextType | null>(null);

// Provider 구현
export const PostStatusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [postStatus, setPostStatus] = useState<PostStatus>(initialPostStatus);

  const updatePostStatus = (status: Partial<PostStatus>) => {
    setPostStatus((prev) => ({ ...prev, ...status }));
  };

  const resetPostStatus = () => {
    setPostStatus(initialPostStatus);
  };

  return (
    <PostStatusContext.Provider value={{ ...postStatus, updatePostStatus, resetPostStatus }}>
      {children}
    </PostStatusContext.Provider>
  );
};

// 커스텀 훅
export const usePostStatus = (): PostStatusContextType => {
  const context = useContext(PostStatusContext);
  if (!context) {
    throw new Error("usePostStatus는 PostStatusProvider 내부에서 사용해야 합니다.");
  }
  return context;
};