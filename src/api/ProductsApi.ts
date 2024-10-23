import { LicensePaymentDencode } from "@/app/core/products/interfaces";
import { coreApi } from "@/lib/core.api";
import { isAxiosError } from "axios";

export const paymentDencode = async (
    code: string,
): Promise<LicensePaymentDencode> => {
    try {
        const { data } = await coreApi.post<LicensePaymentDencode>(`/licenses/payment/dencode`,
            {
                code

            });
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }

        throw error;
    }
};
