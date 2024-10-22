import * as z from "zod";

export const SuccessResponseDataSchema = z.object({
    message: z.string(),
    status: z.number(),
});
export type TSuccessResponseData = z.infer<typeof SuccessResponseDataSchema>;

export const SuccessResponseSchema = z.object({
    data: SuccessResponseDataSchema,
});
export type TSuccessResponseSchema = z.infer<typeof SuccessResponseSchema>;
