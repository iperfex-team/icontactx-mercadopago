import { User, VideoHelper } from "@/interfaces";
import { coreApi } from "@/lib/core.api";
import { AxiosError } from "axios";
// import { getUser } from "@/api/AuthApi";

// Generated by https://quicktype.io
export interface LoginResponse {
    icid: string;
    message: string;
    status: number;
    token: string;
    totp: boolean;
}

export class AuthService {
    static login = async (
        email: string,
        password: string
    ): Promise<LoginResponse> => {
        try {
            const { data } = await coreApi.post<LoginResponse>("/login", {
                email,
                password,
            });

            return data;
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError) {
                throw error.response?.data.errors;
            }

            console.log(error);
            throw new Error("An error occurred while logging in.");
        }
    };

    static getUser = async (): Promise<User> => {
        try {
            
            const { data } = await coreApi.get<User>("/users/data");
            
            return data;
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while getting user data.");
        }
    };

    static getHelper = async (
        module: string,
        section: string
    ): Promise<VideoHelper> => {
        try {
            const { data } = await coreApi.get<VideoHelper>(
                //`/helper?m=${module}&s=${section}`
                `/helper?m=dashboard&s=index`
            );
            return data;
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while getting helper data.");
        }
    };
}
