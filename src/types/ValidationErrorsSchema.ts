import * as z from "zod";

export const ErrorElementSchema = z.object({
    message: z.string(),
    source: z.string(),
});
export type ErrorElement = z.infer<typeof ErrorElementSchema>;

export const ValidationErrorsSchema = z.object({
    errors: z.array(ErrorElementSchema),
    status: z.number(),
});
export type TValidationErrors = z.infer<typeof ValidationErrorsSchema>;
