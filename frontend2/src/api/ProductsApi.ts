import { Products, Pays, licensePayment,LicensePaymentDencode } from "@/app/core/products/interfaces";
import { coreApi } from "@/lib/core.api";
import { isAxiosError } from "axios";
// import { TSuccessResponseSchema, ValidationErrorsSchema } from "@/types";

export const getProducts = async (device: string): Promise<Products> => {
    try {
        const { data } = await coreApi.get<Products>(`/products/${device}`);

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }

        throw error;
    }
};
export const getPaymentMethods = async (): Promise<Pays> => {
    try {
        const { data } = await coreApi.get<Pays>(`/payment/methods`);
        console.log(data)
        console.log(data)
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }

        throw error;
    }
};
export const getPayment_id = async (  tenant: string,
uuid: string,
device: string,
license: string,
channel: string,
expiration: string): Promise<licensePayment> => {
    try {
        const { data } = await coreApi.post<licensePayment>(`/licenses/payment/encode`,
        {
            tenant,
            uuid,
            device,
            license,
            channel,
            expiration
            
        });
        console.log(data)
        console.log(data)
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }

        throw error;
    }
};

export const paymentDencode = async ( 
    code: string,
): Promise<LicensePaymentDencode> => {
    try {
        const { data } = await coreApi.post<LicensePaymentDencode>(`/licenses/payment/dencode`,
        {
            code
            
        });
        console.log(data)
        console.log(data)
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }

        throw error;
    }
};
