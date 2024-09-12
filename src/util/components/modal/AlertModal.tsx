"use client";

import React from "react";
import { useAtom } from "jotai";
import { modalMessageAtom, isModalOpenAtom } from "@/util/store/alertModal";

export const AlertModal: React.FC = () => {
  const [modalMessage, setModalMessage] = useAtom(modalMessageAtom);
  const [isModalOpen, setModalOpen] = useAtom(isModalOpenAtom);

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[9999]">
      <div className="bg-white border border-black rounded-lg p-8 w-[90%] max-w-[600px]">
        <p className="mb-4">{modalMessage}</p>
        <button
          className="bg-blue-500 text-white p-2 rounded"
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