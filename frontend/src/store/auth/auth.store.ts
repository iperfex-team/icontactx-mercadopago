import type { AuthStatus, User } from "@/interfaces";
import { AuthService } from "@/services/auth.service";
import { AuthForm } from "@/types";
import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface AuthState {
    status: AuthStatus;
    token?: string;
    icid?: string;
    totp?: boolean;
    user?: User;
    lic?: string;

    loginUser: (token: string, icid : string ) => Promise<void>;
    checkAuthStatus: () => Promise<void>;
    logout: () => void;
    setLicense: (lic: string) => void;
}

const storeApi: StateCreator<AuthState> = (set) => ({
    status: "pending",
    token: undefined,
    icid: undefined,
    totp: false,
    user: undefined,
    lic: undefined,

    loginUser: async ( token : string, icid : string) => {
        try {
    
            
            set({ status: "authorized", token: token, icid: icid });

            const user = await AuthService.getUser();

            set({
                status: "authorized",
                token: token,
                icid: icid,
                user,
            });
        } catch (error) {
            set({ status: "unauthorized", token: undefined, icid: undefined });
            throw error;
        }
    },

    checkAuthStatus: async () => {
        try {
            
            const user = await AuthService.getUser();
            set({ status: "authorized", user });
        } catch (error) {
            set({ status: "unauthorized", token: undefined, user: undefined });
        }
    },

    logout: () => {
        document.cookie = 'auth-store=; Max-Age=0; path=/; domain=' + location.hostname;
        set({
            status: "unauthorized",
            token: undefined,
            user: undefined,
            icid: undefined,
        });
    },

    setLicense: (lic: string) => {
        set({ lic });
    },
});

export const useAuthStore = create<AuthState>()(
    // devtools(storeApi)
    devtools(persist(storeApi, { name: "auth-store" }))
);
