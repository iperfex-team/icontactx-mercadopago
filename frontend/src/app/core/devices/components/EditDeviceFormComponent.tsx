import { UseFormReturn } from "react-hook-form";
import { EditDeviceType } from "../schemas";
import { Tenant } from "@/interfaces";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import ReactSelect from "react-select";
import { Input } from "@/components/ui/input";
import { lang } from "@/helpers";
import { JsonFormatterModal } from "@/components";
import { Device } from "@/app/core/devices/interfaces";

interface EditDeviceFormComponentProps {
    form: UseFormReturn<EditDeviceType>;
    tenants: Tenant[];
    deviceData: Device;
}

export const EditDeviceFormComponent = ({
    form,
    tenants,
    deviceData,
}: EditDeviceFormComponentProps) => {
    return (
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            <FormField
                control={form.control}
                name="tenant"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="tenant">
                            {lang("devices.edit.form.tenant.label")}
                        </FormLabel>
                        <FormControl>
                            <ReactSelect
                                options={tenants}
                                onChange={(selectedOption) => {
                                    field.onChange(selectedOption?.value ?? "");
                                }}
                                value={tenants.find(
                                    (tenant) => tenant.value === field.value
                                )}
                            />
                        </FormControl>
                    </FormItem>
                )}
            ></FormField>

            <FormField
                control={form.control}
                name="device"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="device">
                            {" "}
                            {lang("devices.edit.form.device.label")}
                        </FormLabel>
                        <div className="flex">
                            <FormControl>
                                <Input {...field} readOnly />
                            </FormControl>
                            <JsonFormatterModal
                                data={JSON.stringify(deviceData.sysinfo)}
                            />
                        </div>
                    </FormItem>
                )}
            ></FormField>
        </div>
    );
};
