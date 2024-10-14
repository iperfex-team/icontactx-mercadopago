import { isAxiosError } from "axios";
import { UserFormData, ValidationErrorsSchema } from "@/types";
import { coreApi } from "@/lib/core.api";
import { Users } from "@/interfaces/users.interface";
import { PaginationState } from "@tanstack/react-table";
import { TEditUser } from "@/types/UserSchema";
import { TEditUserForm } from "../types/UserSchema";
import { Country } from "@/interfaces";
import { TSuccessResponseSchema } from "@/types/ResponsesSchema";

export interface IGetUsersOptions {
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

export async function createUser(
    payload: UserFormData
): Promise<TSuccessResponseSchema> {
    try {
        const fields = { ...payload, phone: +payload.phone };

        const { data } = await coreApi.post<TSuccessResponseSchema>(
            "/users/create",
            fields
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
}

// List of users API
export async function getUsers({
    draw = 1,
    search = "",
    pagination,
    offset,
    sort,
}: IGetUsersOptions): Promise<Users> {
    try {
        // const params = new URLSearchParams();
        // params.append("length", length?.toString());
        const columnIndex = getColumnIndex(sort.field);

        const { data } = await coreApi.get<Users>(
            `/users?length=${
                pagination?.pageSize
            }&start=${offset}&order[column]=${columnIndex}&draw=${draw}&column[name]=${
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
}

export async function getUser(id: string) {
    try {
        const { data } = await coreApi.get<TEditUser>(`/users/${id}`);

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

export async function getCountries() {
    try {
        const { data } = await coreApi.get<Country>("/users/countries");

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }

        throw error;
    }
}

type TUserUpdatePayload = {
    payload: TEditUserForm;
    id: string;
};
export async function updateUser({
    payload,
    id,
}: TUserUpdatePayload): Promise<TSuccessResponseSchema> {
    try {
        const fields = { ...payload, enabled: payload.enabled ? 1 : 0 };

        const { data } = await coreApi.put<TSuccessResponseSchema>(
            `/users/update/${id}`,
            fields
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
}

export async function deleteUser(id: number) {
    try {
        const { data } = await coreApi.delete(`/users/${id}`);

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
        case "id":
            return 0;
        case "company":
            return 1;
        case "fullname":
            return 2;
        case "level":
            return 3;
        case "enabled":
            return 4;
        case "country":
            return 5;
        case "creation_date":
            return 6;
        case "last_login":
            return 7;
        default:
            return 0;
    }
};
