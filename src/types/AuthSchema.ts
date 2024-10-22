import * as z from "zod";

export const AuthSchema = z.object({
    icid: z.string(),
    message: z.string(),
    status: z.number(),
    token: z.string(),
    totp: z.boolean(),
});
export type Auth = z.infer<typeof AuthSchema>;

//- User Data
export const CountrySchema = z.object({
    code: z.string(),
    name: z.string(),
    timezone: z.string(),
});
export type Country = z.infer<typeof CountrySchema>;

export const CompanySchema = z.object({
    footer: z.string(),
    logo: z.string(),
    logoMini: z.string(),
    name: z.string(),
});
export type Company = z.infer<typeof CompanySchema>;

export const AuthUserDataSchema = z.object({
    company: CompanySchema,
    country: CountrySchema,
    email: z.string(),
    fullName: z.string(),
    id: z.number(),
    language: z.string(),
    level: z.number(),
    status: z.number(),
    tenant: z.number(),
});
export type AuthUserData = z.infer<typeof AuthUserDataSchema>;

export const ClientSchema = z.object({
    fullName: z.string(),
});
export type ClientDataType = z.infer<typeof ClientSchema>;
