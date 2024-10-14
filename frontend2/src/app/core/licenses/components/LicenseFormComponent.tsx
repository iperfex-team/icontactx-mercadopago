import { UseFormReturn } from "react-hook-form";
import { License } from "@/app/core/licenses/interfaces";
import { LicenseSchemaType } from "@/app/core/licenses/types";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import ReactSelect from "react-select";
// import { useTenants } from "@/hooks";
import { Tenants } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";
import {
    getLicenseDevicesByTenant,
    getLicenseChannels,
    getLicenseExpirations,
    getLicenseNames,
} from "@/api/LicenseApi";
import { Input, Loading } from "@/components";
import { lang } from "@/helpers";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { iDate } from "@/lib";
import { IoCalendarOutline } from "react-icons/io5";
import { getTenantsForLicense } from "@/api/TenantApi";

const getDaysFromExpireField = (expire: string) => {
    switch (expire) {
        case "10Days":
            return 10;
        case "1Month":
            return 30;
        case "3Month":
            return 90;
        case "6Month":
            return 180;
        case "1Year":
            return 365;

        default:
            break;
    }
    // const unit = expire.substring(0, 1);
    // console.log(unit);
    // return parseInt(unit);
};

interface LicenseFormProps {
    form: UseFormReturn<LicenseSchemaType>;
    licenseData?: License;
}
export const LicenseFormComponent = ({
    form,
    licenseData,
}: LicenseFormProps) => {
    const { license } = useParams();
    // const { tenantsQuery } = useTenants();
    const [tenant, setTenant] = useState<string | undefined>(
        license ? form.getValues("tenant_uuid") : undefined
    );

    const tenantsQuery = useQuery({
        queryKey: ["tenantsByLicense"],
        queryFn: getTenantsForLicense,
    });
    const { tenants } = (tenantsQuery?.data as Tenants) ?? [];
    const licenseDevicesQuery = useQuery({
        queryKey: ["licenseDevices", tenant],
        queryFn: () => getLicenseDevicesByTenant(tenant),
        enabled: !!tenant,
    });
    const licenseNamesQuery = useQuery({
        queryKey: ["licenseNames"],
        queryFn: getLicenseNames,
    });
    const licenseChannelsQuery = useQuery({
        queryKey: ["licenseChannels"],
        queryFn: getLicenseChannels,
    });
    const licenseExpirationQuery = useQuery({
        queryKey: ["licenseExpirations"],
        queryFn: getLicenseExpirations,
    });

    const qtyOfDevices = licenseDevicesQuery.data?.license.length;

    return licenseDevicesQuery.isLoading ||
        licenseNamesQuery.isLoading ||
        licenseChannelsQuery.isLoading ||
        licenseExpirationQuery.isLoading ? (
        <Loading />
    ) : (
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            <FormField
                control={form.control}
                name="tenant_uuid"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            {lang("licenses.form.company.label")}
                        </FormLabel>
                        <FormControl>
                            <ReactSelect
                                ref={field.ref}
                                options={tenants}
                                onChange={(selectedOption) => {
                                    field.onChange(selectedOption?.value);
                                    setTenant(selectedOption?.value);
                                }}
                                value={tenants.find(
                                    (tenant) => tenant.value === field.value
                                )}
                                isDisabled={!!license}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            ></FormField>

            <FormField
                control={form.control}
                name="device_id"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            {" "}
                            {lang("licenses.form.device.label")}
                        </FormLabel>
                        <FormControl>
                            {!!license && qtyOfDevices === 1 ? (
                                <Input {...field} disabled />
                            ) : (
                                <ReactSelect
                                    options={
                                        licenseDevicesQuery.data?.license ?? []
                                    }
                                    onChange={(selectedOption) => {
                                        field.onChange(selectedOption?.value);
                                    }}
                                    value={licenseDevicesQuery.data?.license?.find(
                                        (license) => {
                                            return (
                                                license.value === field.value
                                            );
                                        }
                                    )}
                                    isDisabled={
                                        !license &&
                                        !form.getFieldState("tenant_uuid")
                                            .isDirty
                                    }
                                />
                            )}
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            ></FormField>
            <FormField
                control={form.control}
                name="license_id"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            {" "}
                            {lang("licenses.form.licenseName.label")}
                        </FormLabel>
                        <FormControl>
                            <ReactSelect
                                options={licenseNamesQuery.data?.license}
                                onChange={(selectedOption) => {
                                    console.log(selectedOption);
                                    field.onChange(selectedOption?.value);
                                }}
                                value={licenseNamesQuery.data?.license.find(
                                    (license) => {
                                        return license.value === field.value;
                                    }
                                )}
                                isDisabled={
                                    !!license ||
                                    !form.getFieldState("device_id").isDirty
                                }
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            ></FormField>
            <FormField
                control={form.control}
                name="channels"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            {" "}
                            {lang("licenses.form.channels.label")}
                        </FormLabel>
                        <FormControl>
                            <ReactSelect
                                options={licenseChannelsQuery.data?.license}
                                onChange={(selectedOption) => {
                                    console.log(selectedOption);
                                    field.onChange(selectedOption?.value);
                                }}
                                value={licenseChannelsQuery.data?.license.find(
                                    (license) => {
                                        return license.value === field.value;
                                    }
                                )}
                                isDisabled={
                                    !license &&
                                    !form.getFieldState("license_id").isDirty
                                }
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            ></FormField>
            <FormField
                control={form.control}
                name="expire"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            {" "}
                            {lang("licenses.form.expirationDate.label")}
                        </FormLabel>
                        <div className="flex flex-wrap items-center gap-x-2 sm:flex-nowrap">
                            <FormControl>
                                <ReactSelect
                                    className="flex-1"
                                    options={
                                        licenseExpirationQuery.data?.license
                                    }
                                    onChange={(selectedOption) => {
                                        console.log(selectedOption);
                                        field.onChange(selectedOption?.value);
                                    }}
                                    isDisabled={
                                        !license &&
                                        !form.getFieldState("channels").isDirty
                                    }
                                    value={licenseExpirationQuery.data?.license.find(
                                        (license) => {
                                            return (
                                                license.value === field.value
                                            );
                                        }
                                    )}
                                />
                            </FormControl>

                            {!!license && (
                                <ExpireDate
                                    date={
                                        form.getFieldState("expire").isDirty
                                            ? new Date().toISOString()
                                            : licenseData!.expire_date
                                    }
                                    days={field.value}
                                    changeExpireDate={
                                        form.getFieldState("expire").isDirty
                                    }
                                />
                            )}
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            ></FormField>

            {/* <pre>{JSON.stringify(form.control._fields.tenant_id, null, 2)}</pre>
            <pre>{JSON.stringify(form.control._formValues, null, 2)}</pre> */}
        </div>
    );
};

const ExpireDate = ({
    date,
    days,
    changeExpireDate,
}: {
    date: string;
    days: string;
    changeExpireDate: boolean;
}) => {
    const remainingDays = getDaysFromExpireField(days)!;
    return (
        <div className="flex items-center gap-x-1">
            <IoCalendarOutline className="font-bold text-red-400" />
            {/* {formatToYMD(date)} - ({getDaysFromExpireField(days)!}){" "} */}
            <p>
                <span>
                    {" "}
                    {changeExpireDate
                        ? iDate.getExpireDate(date, remainingDays)
                        : iDate.formatToYMD(date)}
                </span>{" "}
                <span className="text-slate-800">
                    [{remainingDays} {lang("licenses.form.days")}]
                </span>
            </p>
            {/* <span> {getExpireDate(date, getDaysFromExpireField(days)!)}</span> */}
        </div>
    );
};
