import { create } from 'zustand'

export type ApiStatus = {
    isPending: boolean; // 요청 진행 여부
    message: string; // 상태 메시지
    callback: (() => void) | null; // 완료 후 실행될 콜백
    isAlertModalOpen: boolean; // 알림 모달 표시 여부
}

export type Action = {
    updateApiStatus: (status: Partial<ApiStatus>) => void;
    resetApiStatus: () => void;
}

const useApiStatus = create<ApiStatus & Action>((set) => ({
    isPending: false,
    message: '',
    callback: null,
    isAlertModalOpen: false,
    resetApiStatus: () => set({
        isPending: false,
        message: '',
        callback: null,
        isAlertModalOpen: false,
    }),

    updateApiStatus: (status) => set((state) => ({
        ...state, // 기존 상태를 유지
        ...status, // 전달된 새로운 상태로 업데이트
    })),
}));

export default useApiStatus;