import { LicenseDevice } from "@/app/core/licenses/interfaces";
import { Tenants } from "@/interfaces";
import { coreApi } from "@/lib/core.api";
import { isAxiosError } from "axios";

export const getTenants = async (): Promise<Tenants> => {
    try {
        const { data } = await coreApi.get<Tenants>("/tenants");

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }

        throw error;
    }
};

export const getTenantsForLicense = async (): Promise<Tenants> => {
    try {
        const { data } = await coreApi.get<Tenants>("/licenses/tenants");

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }

        throw error;
    }
};

export const getTenantsForProducts = async (): Promise<Tenants> => {
    try {
        const { data } = await coreApi.get<Tenants>("/products/tenants");

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }

        throw error;
    }
};

export const getDevicesByTenant = async (
    tenant: string
): Promise<LicenseDevice> => {
    try {
        const { data } = await coreApi.get<LicenseDevice>(
            `/products/devices/tenants/${tenant}`
        );

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }

        throw error;
    }
};
