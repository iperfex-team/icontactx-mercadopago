import { CloudShellSessionResponse } from "@/app/core/cloud-shell/interfaces";
import { coreApi } from "@/lib";
import { isAxiosError } from "axios";
import { ValidationErrorsSchema } from "@/types";

export class CloudShellService {
    static startSession = async (
        device: string
    ): Promise<CloudShellSessionResponse> => {
        try {
            const { data } = await coreApi.post<CloudShellSessionResponse>(
                `/cloudshell/session/${device}`,
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
    };
}
