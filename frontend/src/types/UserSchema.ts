/** Users */
import { translate } from "@/helpers/custom-i18n";
import { z } from "zod";

export const userSchema = z
    .object({
        // id: z.string(),
        fullname: z.string().min(1),
        company: z.string().min(1),
        email: z.string().email(),
        phone: z.string(),
        password: z.string().min(8),
        confirmpassword: z.string().min(8),
        country: z.string().nullable(),
        timezone: z.string(),
        language: z.enum(["en", "es", "pt"]),
        typeuser: z.string(),
    })

    .superRefine(({ password, confirmpassword }, ctx) => {
        if (password !== confirmpassword) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["confirmpassword"],
                message: translate("users.form.errorMessages.confirmPassword"),
            });
        }
        return {};
    });

export type User = z.infer<typeof userSchema>;
export type UserFormData = Pick<
    User,
    | "fullname"
    | "company"
    | "email"
    | "phone"
    | "password"
    | "confirmpassword"
    | "country"
    | "timezone"
    | "language"
    | "typeuser"
>;

export const EditUserSchema = z.object({
    company: z.string(),
    country: z.string(),
    country_iso: z.string(),
    creation_date: z.coerce.date(),
    customer_number: z.number(),
    email: z.string(),
    enabled: z.boolean(),
    fullname: z.string(),
    icid: z.string(),
    id: z.number(),
    language: z.string(),
    last_login: z.coerce.date(),
    level: z.number(),
    phone: z.number(),
    status: z.number(),
    timezone: z.string(),
    totp: z.string(),
    typeuser: z.string(),
});
export type TEditUser = z.infer<typeof EditUserSchema>;

export const EditUserFormSchema = z
    .object({
        id: z.number(),
        company: z.string(),
        country: z.string(),
        email: z.string(),
        password: z.string().optional(),
        confirmpassword: z.string().optional(),
        enabled: z.boolean(),
        fullname: z.string(),
        language: z.string(),
        phone: z.number(),
        timezone: z.string(),
        typeuser: z.string(),
    })
    .superRefine(({ password, confirmpassword }, ctx) => {
        if (password !== confirmpassword) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["confirmpassword"],
                message: translate("users.form.errorMessages.confirmPassword"),
            });
        }

        if (password && password!.length < 8) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["password"],
                message: translate("users.form.errorMessages.passwordLength"),
            });
        }

        if (confirmpassword && confirmpassword!.length < 8) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["confirmpassword"],
                message: translate("users.form.errorMessages.passwordLength"),
            });
        }
        return {};
    });
export type TEditUserForm = z.infer<typeof EditUserFormSchema>;
