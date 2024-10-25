import { isAxiosError } from "axios";
import { coreApi } from "@/lib/core.api";
import { Order } from "@/app/core/pay/interfaces";

export async function postCreatePay(price: string, product: string, uuid: string, description: string) {
    try {

        const data = await coreApi.post<Order>(`${import.meta.env.VITE_CORE_API_URL}/payments`, {
            product,
            price,
            uuid,
            description
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

