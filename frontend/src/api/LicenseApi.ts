import {
    License,
    LicenseChannel,
    LicenseDevice,
    LicenseExpiration,
    LicenseName,
    LicenseTracking,
    Licenses,
    LicensePrice,
    LicensePay
} from "@/app/core/licenses/interfaces";
import { LicenseSchemaType } from "@/app/core/licenses/types";
import { IGetDataTableOptions } from "@/interfaces";
import { coreApi } from "@/lib/core.api";
import { TSuccessResponseSchema, ValidationErrorsSchema } from "@/types";
import { isAxiosError } from "axios";

export const getLicenses = async ({
    search,
    sort,
    pagination,
    offset,
}: IGetDataTableOptions): Promise<Licenses> => {
    try {
        const columnIndex = getLicenseColumnIndex(sort.field);
        const { data } = await coreApi.get<Licenses>(
            `/licenses?length=${
                pagination?.pageSize
            }&start=${offset}&order[column]=${columnIndex}&column[name]=${
                sort.field
            }&sort=${sort.order ?? "asc"}&search=${search}`
        );

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }

        throw error;
    }
};

export const getLicenseDevicesByTenant = async (
    tenant: string | undefined
): Promise<LicenseDevice> => {
    try {
        const { data } = await coreApi.get<LicenseDevice>(
            `/licenses/devices/tenants/${tenant}`
        );

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }

        throw error;
    }
};

export const updateLicense = async (payload: {
    license: string;
    data: {
        device_id: string;
        channels: string;
        expire: string | null;
    };
}): Promise<TSuccessResponseSchema> => {
    try {
        const { data } = await coreApi.put<TSuccessResponseSchema>(
            `/licenses/update/${payload.license}`,
            payload.data
        );

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const { errors } = ValidationErrorsSchema.parse(
                error.response.data
            );

            throw new Error(
                errors
                    .map((error) => `${error.source}: ${error.message}`)
                    .join("\n")
            );
        }

        throw error;
    }
};

export const getLicenseNames = async (): Promise<LicenseName> => {
    try {
        const { data } = await coreApi.get<LicenseName>("/licenses/name");

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }

        throw error;
    }
};

export const getLicenseChannels = async (): Promise<LicenseChannel> => {
    try {
        const { data } = await coreApi.get<LicenseChannel>(
            "/licenses/channels"
        );

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }

        throw error;
    }
};

export const getLicensePrice = async (
    license: string, 
    channels: string, 
    expiration: string
): Promise<LicensePrice> => {
    try {
        const { data } = await coreApi.post<LicensePrice>(
            "/licenses/price",
            {
                    license,
                    channels,
                    expiration
                
            }
        );

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }

        throw error;
    }
};

export const getLicensePay = async (paymentId: string, ): Promise<LicensePay> => {
    try {
        const { data } = await coreApi.get<LicensePay>(
            `/licenses/purchase/${paymentId}`
        );

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }

        throw error;
    }
};

export const getLicenseExpirations = async (): Promise<LicenseExpiration> => {
    try {
        const { data } = await coreApi.get<LicenseExpiration>(
            "/licenses/expiration"
        );

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }

        throw error;
    }
};

export const registerLicense = async (
    payload: LicenseSchemaType
): Promise<TSuccessResponseSchema> => {
    try {
        const { data } = await coreApi.post<TSuccessResponseSchema>(
            "/licenses/create",
            payload
        );

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const { errors } = ValidationErrorsSchema.parse(
                error.response.data
            );

            throw new Error(
                errors
                    .map((error) => `${error.source}: ${error.message}`)
                    .join("\n")
            );
        }

        throw error;
    }
};

export const deleteLicense = async (
    license: string
): Promise<TSuccessResponseSchema> => {
    try {
        const { data } = await coreApi.delete<TSuccessResponseSchema>(
            `/licenses/${license}`
        );

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const { errors } = ValidationErrorsSchema.parse(
                error.response.data
            );
            throw new Error(errors.map((error) => error.message).join("\n"));
        }

        throw error;
    }
};

export const restartLicense = async (
    license: string
): Promise<TSuccessResponseSchema> => {
    try {
        const { data } = await coreApi.put<TSuccessResponseSchema>(
            `/licenses/restart/${license}`
        );

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const { errors } = ValidationErrorsSchema.parse(
                error.response.data
            );
            throw new Error(errors.map((error) => error.message).join("\n"));
        }

        throw error;
    }
};

export const getLicense = async (license: string): Promise<License> => {
    try {
        const { data } = await coreApi.get<License>(`/licenses/${license}`);

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }

        throw error;
    }
};

export const getLicenseTracking = async (
    license: string,
    options: IGetDataTableOptions
): Promise<LicenseTracking> => {
    try {
        const { search, sort, pagination, offset } = options;
        const columnIndex = getTrackingLicenseColumnIndex(sort.field);

        const { data } = await coreApi.get<LicenseTracking>(
            `/licenses/tracking/${license}?length=${
                pagination?.pageSize
            }&start=${offset}&order[column]=${columnIndex}&column[name]=${
                sort.field
            }&sort=${sort.order ?? "asc"}&search=${search}`
        );

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }

        throw error;
    }
};

const getTrackingLicenseColumnIndex = (column: string) => {
    switch (column) {
        case "device":
            return 0;
        case "channels":
            return 1;
        case "creation_date":
            return 2;
        case "expire":
            return 3;
        case "expireString":
            return 4;
        default:
            return 0;
    }
};

const getLicenseColumnIndex = (column: string) => {
    switch (column) {
        case "company":
            return 0;
        case "status":
            return 1;
        case "license_send_count":
            return 2;
        case "name":
            return 3;
        case "device":
            return 4;
        case "channels":
            return 5;
        case "creation_date":
            return 6;
        case "expire":
            return 7;
        default:
            return 0;
    }
};
