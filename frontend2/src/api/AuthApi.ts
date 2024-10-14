import api from "@/lib/axios";
import { AuthForm, PurpleError } from "@/types";
import { AuthUserDataSchema } from "@/types/AuthSchema";
import axios, { isAxiosError } from "axios";

export async function login(formData: AuthForm) {
    try {
        
        const { data } = await api.post<string>("/core/login", formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            error.response.data.errors.map((error: PurpleError) => {
                throw {
                    source: error.source,
                    message: error.message,
                };
            });
        }
    }
}

export async function getUser() {
    try {
        console.log("api")
        console.log(api)
       
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

export async function getPrueba(price : string, product : string, uuid : string) {
    try {
        
        const  data  = await axios.post<string>("http://localhost:3001/mercado_pago",{
            product,
            price,
            uuid
        });
        const response = data;
        if (response) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.errors[0].message);
        }
    }
}
