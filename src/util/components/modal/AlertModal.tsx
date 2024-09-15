"use client";

import React from "react";
import { useAtom } from "jotai";
import { modalMessageAtom, isModalOpenAtom } from "@/util/store/alertModal";

const AlertModal: React.FC = () => {
    
  const [modalMessage, setModalMessage] = useAtom(modalMessageAtom);
  const [isModalOpen, setModalOpen] = useAtom(isModalOpenAtom);

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-[9999] flex items-center justify-center">
      <div className="flex flex-col bg-white border rounded-lg p-[10px] gap-4 items-center w-1/8 h-1/2">
        <p className="mb-4 text-center">{modalMessage}</p>
        <button
          className="bg-red-800 p-2 rounded-lg w-1/2 text-white"
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

export default AlertModal