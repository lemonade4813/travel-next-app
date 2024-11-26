"use client"


import React, { createContext, useContext, useState } from 'react';

type PostResult = {
  message?: string;
  callback?: () => void;
};

type PostResultContextType = {
  postResult: PostResult;
  updatePostResult: (result: PostResult) => void;
};

const PostResultContext = createContext<PostResultContextType | null>(null);

export const PostResultProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [postResult, setPostResult] = useState<PostResult>({});

  const updatePostResult = (result: PostResult) => {
    setPostResult(result);
  };

  return (
    <PostResultContext.Provider value={{ postResult, updatePostResult }}>
      {children}
    </PostResultContext.Provider>
  );
};

export const usePostResult = (): PostResultContextType => {
  const context = useContext(PostResultContext);
  if (!context) {
    throw new Error('usePostResult 함수는 PostResultProvider 내부에서 사용하세요.');
  }
  return context;
};