import api from "@/lib/axios";
import { AuthUserDataSchema } from "@/types/AuthSchema";
import { isAxiosError } from "axios";


export async function getUser() {
    try {
        const { data } = await api.get<string>("/core/users/data");
        const response = AuthUserDataSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors[0].message);
        }
    }
}

