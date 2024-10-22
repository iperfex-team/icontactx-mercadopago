import { z } from "zod";

export {
    SuccessResponseSchema,
    SuccessResponseDataSchema,
    type TSuccessResponseData,
    type TSuccessResponseSchema,
} from "./ResponsesSchema";

export { userSchema } from "./UserSchema";
export { type UserFormData } from "./UserSchema";
export * as UserSchema from "./UserSchema";
export {
    ValidationErrorsSchema,
    type TValidationErrors,
} from "./ValidationErrorsSchema";

/** Error */
export const PurpleErrorSchema = z.object({
    source: z.string(),
    message: z.string(),
});
export type PurpleError = z.infer<typeof PurpleErrorSchema>;
