"use client"

import useApiStatus from "@/util/store/postStatus";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";


const Modal: React.FC = () => {

  const modalRoot = typeof window !== "undefined" ? document.getElementById("modal-root") : null;

  const { message,
    resetApiStatus, 
    isAlertModalOpen, 
    callback } = useApiStatus();



  useEffect(() => {
    if (isAlertModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isAlertModalOpen]);

  if (!isAlertModalOpen || !modalRoot) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-11/12"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="mb-4 text-center">{message}</p>
              <button
                className="bg-red-800 text-white p-2 rounded-lg w-full hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-400"
                onClick={() => {
                  resetApiStatus();
                  callback && callback();
                }}
              >
                확인
              </button>
        </div>
        </div>
    </div>,
    modalRoot
  );
};

export default Modal;