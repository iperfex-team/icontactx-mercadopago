import { create } from "zustand";

interface State {
    isSidebarOpen: boolean;
    axiosResponseTime: number | null;

    setSidebarOpen: (isOpen: boolean) => void;
    setAxiosResponseTime: (time: number) => void;
}

export const useUIStore = create<State>()((set) => ({
    isSidebarOpen: false,
    axiosResponseTime: 0,

    setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
    setAxiosResponseTime: (time) => set({ axiosResponseTime: time }),
}));
