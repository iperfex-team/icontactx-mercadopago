import axios, { isAxiosError } from "axios";

export async function postCreatePay(price: string, product: string, uuid: string) {
    try {

        const data = await axios.post<string>(`${import.meta.env.VITE_PAY_MP_BACKEND_URL}/mercado_pago`, {
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

