"use client";

import React from "react";
import {usePostStatus } from "../context/PostResultContext";


const AlertModal: React.FC = () => {
    
  const { message,
          resetPostStatus, 
          isAlertModalOpen, 
          callback } = usePostStatus();

  if (!isAlertModalOpen) return null;


  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/4">
        <p className="mb-4 text-center">{message}</p>
        <button
          className="bg-red-800 p-2 rounded-lg w-full text-white"
          onClick={() => {
            resetPostStatus();
            callback && callback();
          }}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default AlertModal;