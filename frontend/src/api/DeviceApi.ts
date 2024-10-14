import {
    Device,
    DeviceHistory,
    DeviceLicense,
    DeviceLogs,
} from "@/app/core/devices/interfaces";
import { Devices, IGetDataTableOptions } from "@/interfaces";
import { coreApi } from "@/lib/core.api";
import { TSuccessResponseSchema, ValidationErrorsSchema } from "@/types";
import { PaginationState } from "@tanstack/react-table";
import { isAxiosError } from "axios";

interface IGetUsersOptions {
    draw?: number;
    length?: number;
    search?: string;
    pagination?: PaginationState;
    offset?: number;
    sort: {
        field: string;
        order: string | null;
    };
}
export const getDevices = async ({
    search = "",
    sort,
    pagination,
    offset,
}: IGetUsersOptions): Promise<Devices> => {
    try {
        const columnIndex = getColumnIndex(sort.field);

        const { data } = await coreApi.get<Devices>(
            `/devices?length=${
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

export const getDevice = async (device: string): Promise<Device> => {
    try {
        console.log(`Getting device with device: ${device}`);
        const { data } = await coreApi.get<Device>(`/devices/${device}`);

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }

        throw error;
    }
};

interface IUpdateDevice {
    device: string;
    tenant: string;
}
export const updateDevice = async (
    payload: IUpdateDevice
): Promise<TSuccessResponseSchema> => {
    try {
        const { data } = await coreApi.put<TSuccessResponseSchema>(
            `/devices/update/${payload.device}`,
            { tenant: payload.tenant }
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

export const freeDevice = async (
    device: string
): Promise<TSuccessResponseSchema> => {
    try {
        const { data } = await coreApi.put<TSuccessResponseSchema>(
            `/devices/free/${device}`
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

export const getLicensesByDevice = async (
    device: string,
    options: IGetDataTableOptions
): Promise<DeviceLicense> => {
    try {
        const { search, sort, pagination, offset } = options;
        const columnIndex = getLicenseColumnIndex(sort.field);

        const { data } = await coreApi.get<DeviceLicense>(
            `/devices/license/${device}?length=${
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

export const getHistoryByDevice = async (
    device: string,
    options: IGetDataTableOptions
): Promise<DeviceHistory> => {
    try {
        const { search, sort, pagination, offset } = options;
        const columnIndex = getHistoryColumnIndex(sort.field);

        const { data } = await coreApi.get<DeviceHistory>(
            `/devices/history/${device}?length=${
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

export const getLogsByDevice = async (
    device: string,
    options: IGetDataTableOptions
): Promise<DeviceLogs> => {
    try {
        const { search, sort, pagination, offset } = options;
        const columnIndex = getLogsColumnIndex(sort.field);

        const { data } = await coreApi.get<DeviceLogs>(
            `/devices/logs/${device}?length=${
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

export async function deleteDevice(device: string) {
    try {
        console.log(`Deleting user with device: ${device}`);
        const { data } = await coreApi.delete(`/devices/${device}`);

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
}

const getColumnIndex = (column: string) => {
    switch (column) {
        case "company":
            return 0;
        case "device":
            return 1;
        case "platform":
            return 2;
        case "version":
            return 3;
        case "ip":
            return 4;
        case "licenses":
            return 5;
        case "count_connect":
            return 6;
        case "creation_date":
            return 7;
        case "last_connect":
            return 8;
        default:
            return 0;
    }
};

const getLicenseColumnIndex = (column: string) => {
    switch (column) {
        case "name":
            return 0;
        case "channels":
            return 1;
        case "license_send_count":
            return 2;
        case "creation_date":
            return 3;
        case "expire":
            return 4;
        default:
            return 0;
    }
};

const getHistoryColumnIndex = (column: string) => {
    switch (column) {
        case "version":
            return 0;
        case "date_connect":
            return 1;
        case "ip":
            return 2;
        default:
            return 0;
    }
};

const getLogsColumnIndex = (column: string) => {
    switch (column) {
        case "creation_date":
            return 0;
        case "cmd":
            return 1;
        case "parameter":
            return 2;
        case "ip":
            return 3;
        default:
            return 0;
    }
};
