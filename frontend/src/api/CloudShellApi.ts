import { CloudShellSessionResponse } from "@/app/core/cloud-shell/interfaces";
import { coreApi } from "@/lib/core.api";
import { ValidationErrorsSchema } from "@/types";
import { isAxiosError } from "axios";

export async function startSession(
    device: string
): Promise<CloudShellSessionResponse> {
    try {
        const { data } = await coreApi.post<CloudShellSessionResponse>(
            `/users/cloudshell/session/${device}`,
            {}
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
