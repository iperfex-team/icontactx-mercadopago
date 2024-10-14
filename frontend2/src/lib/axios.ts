import { jwt } from "@/helpers";
import { useAuthStore } from "@/store";
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL as string,
    timeout: 10000,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers.icid = localStorage.getItem("icid");

        const { exp: expirationToken } = jwt(token);

        console.log(expirationToken);
        console.log(Date.now());

        // Check if token has expired
        if (expirationToken && Date.now() > Number(expirationToken)) {
            // Handle token expiration logic here
            // For example, redirect to login page or refresh token
            // You can also throw an error to be caught by the Axios error interceptor
            useAuthStore.getState().logout();
        }
    }

    return config;
});

export default api;
