import * as z from "zod";

export const EditDeviceSchema = z.object({
    tenant: z.string(),
    device: z.string(),
});
export type EditDeviceType = z.infer<typeof EditDeviceSchema>;
