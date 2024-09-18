"use client";

import React from "react";
import { useAtom } from "jotai";
import { modalMessageAtom, isModalOpenAtom } from "@/util/store/alertModal";

const AlertModal: React.FC = () => {
    
  const [modalMessage, setModalMessage] = useAtom(modalMessageAtom);
  const [isModalOpen, setModalOpen] = useAtom(isModalOpenAtom);

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/4">
        <p className="mb-4 text-center">{modalMessage}</p>
        <button
          className="bg-red-800 p-2 rounded-lg w-full text-white"
          onClick={() => {
            setModalOpen(false);
            setModalMessage(null);
          }}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default AlertModal;