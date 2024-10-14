import { AuthUserData } from "@/types/AuthSchema";
import { create } from "zustand";

interface AuthUserState {
    user: AuthUserData | null;
    setUser: (user: AuthUserData) => void;
}

export const useAuthStore = create<AuthUserState>()((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}));
