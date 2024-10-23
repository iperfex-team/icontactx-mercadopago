/* eslint-disable @typescript-eslint/no-explicit-any */
import { tokenIsInvalid } from "@/helpers";
import { useAuthStore } from "@/store/auth/auth.store";
import { useUIStore } from "@/store";
import axios from "axios";

const getCookie = (name: string) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

const onSubmit = async (token: string, icid: string) => {
    const { loginUser } = useAuthStore.getState();  // Acceso seguro al estado
    await loginUser(token, icid);
}

declare module "axios" {
    export interface InternalAxiosRequestConfig {
        metadata?: {
            startTime?: Date;
            endTime?: Date;
            duration?: number;
        };
    }
}

const coreApi = axios.create({
    baseURL: import.meta.env.VITE_CORE_API_URL as string,
    timeout: 10000,
});

coreApi.interceptors.request.use((config) => {
    let cookieValue = "";
    let cookieToken = "";
    let cookieIcid = "";
    config.metadata = { startTime: new Date() };

    const { token, icid, logout } = useAuthStore.getState();  // Acceso seguro al estado

    if (!token || !icid) {
        cookieValue = String(getCookie('auth-store'));
        if (!cookieValue) {
            logout();
        }
        if (cookieValue) {
            const cookie = JSON.parse(cookieValue);

            if (cookie.token && cookie.icid) {
                cookieToken = cookie.token;
                cookieIcid = cookie.icid;

                onSubmit(cookie.token, cookie.icid);
            }
        }
    }

    let finalToken = token || cookieToken;
    let finalIcid = icid || cookieIcid;

    if (finalToken) {
        config.headers.Authorization = `Bearer ${finalToken}`;
        config.headers.icid = finalIcid;

        // Check if token has expired
        if (tokenIsInvalid(finalToken)) {
            console.log("is invalid");
            logout();
        }
    }

    return config;
});

coreApi.interceptors.response.use(
    (response) => {
        const endTime = new Date();
        const startTime = (response.config as any).metadata.startTime;
        (response.config as any).metadata.endTime = endTime;
        (response.config as any).metadata.duration =
            endTime.getTime() - startTime.getTime();

        const { setAxiosResponseTime } = useUIStore.getState();  // Acceso seguro al estado
        setAxiosResponseTime((response.config as any).metadata.duration);

        return response;
    },
    (error) => {
        const endTime = new Date();
        const startTime = (error.config as any).metadata.startTime;
        (error.config as any).metadata.endTime = endTime;
        (error.config as any).metadata.duration =
            endTime.getTime() - startTime.getTime();

        const { setAxiosResponseTime } = useUIStore.getState();  // Acceso seguro al estado
        setAxiosResponseTime((error.config as any).metadata.duration);

        return Promise.reject(error);
    }
);

export { coreApi };
