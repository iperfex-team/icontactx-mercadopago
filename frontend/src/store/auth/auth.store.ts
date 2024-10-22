import type { AuthStatus, User } from "@/interfaces";
import { AuthService, LoginResponse } from "@/services/auth.service";
import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";


export interface AuthState {
    status: AuthStatus;
    token?: string;
    icid?: string;
    totp?: boolean;
    user?: User;
    lic?: string;

    loginUser: (token: string, icid: string) => Promise<void>;
    checkAuthStatus: () => Promise<void>;
    logout: (status?: AuthStatus | null) => void;
    setLicense: (lic: string) => void;
    setTotp: (totp: boolean) => void;
    setLogin2faData: (data: LoginResponse) => void;
    setAuthStatus: (status: AuthStatus) => void;
    reset: () => void;
}

const mode = process.env.NODE_ENV

const storeApi: StateCreator<AuthState> = (set, get) => ({
    status: "pending",
    token: undefined,
    icid: undefined,
    totp: false,
    user: undefined,
    lic: undefined,

    loginUser: async (token: string, icid: string) => {
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
            if (!get().totp) {
                const user = await AuthService.getUser();
                set({ status: "authorized", user });
            } else {
                set({ status: "authorized" });
            }
        } catch (error) {
            set({ status: "unauthorized", token: undefined, user: undefined });
        }
    },

    logout: () => {

        mode === "development" ?
        (document.cookie = 'auth-store=; Max-Age=0; path=/; domain=' + location.hostname) :
        mode === "production" &&
        (document.cookie = `auth-store=; Max-Age=0; path=/; domain=${import.meta.env.VITE_CORE_COOKIE_DOMAIN}`);

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

    setTotp: (totp) => {
        set({ totp });
    },

    setLogin2faData: async (data) => {
        set({
            status: "authorized",
            token: data.token,
            icid: data.icid,
            totp: data.totp,
        });

        const user = await AuthService.getUser();

        set({
            user,
        });
    },

    setAuthStatus: (status) => {
        set({ status });
    },

    reset: () => {

        mode === "development" ?
        (document.cookie = 'auth-store=; Max-Age=0; path=/; domain=' + location.hostname) :
        mode === "production" &&
        (document.cookie = `auth-store=; Max-Age=0; path=/; domain=${import.meta.env.VITE_CORE_COOKIE_DOMAIN}`);

        set({
            status: "pending",
            token: undefined,
            icid: undefined,
            totp: false,
            user: undefined,
            lic: undefined,
        });
    },
});

export const useAuthStore = create<AuthState>()(
    // devtools(storeApi)
    devtools(persist(storeApi, { name: "auth-store" }))
);
