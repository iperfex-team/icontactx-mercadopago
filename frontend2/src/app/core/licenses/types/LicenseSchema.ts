import * as z from "zod";

export const LicenseSchema = z.object({
    tenant_uuid: z.string().min(1),
    device_id: z.string().min(1),
    license_id: z.string().min(1),
    channels: z.string().min(1),
    expire: z.string().min(1),
});
export type LicenseSchemaType = z.infer<typeof LicenseSchema>;
