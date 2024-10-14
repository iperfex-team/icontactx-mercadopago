import { create } from "zustand";

interface State {
    isSidebarOpen: boolean;

    setSidebarOpen: (isOpen: boolean) => void;
}

export const useUIStore = create<State>()((set) => ({
    isSidebarOpen: false,

    setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
}));
