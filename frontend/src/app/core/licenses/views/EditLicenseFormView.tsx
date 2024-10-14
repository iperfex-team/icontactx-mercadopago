import { License } from "@/app/core/licenses/interfaces";
// import { Tenants } from "@/interfaces";
import { LicenseSchema, LicenseSchemaType } from "@/app/core/licenses/types";
import { CardWrapper, Form, Button } from "@/components";
import { lang } from "@/helpers";
import {
    LicenseFormComponent,
    LicenseTrackingComponent,
} from "@/app/core/licenses/components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLicense } from "@/api/LicenseApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface IEditLicenseFormViewProps {
    licenseData: License;
    license: string;
}
export const EditLicenseFormView = ({
    licenseData,
    license,
}: IEditLicenseFormViewProps) => {
    const navigate = useNavigate();
    // const { tenants: tenantsData } = tenants;

    const initialValues: LicenseSchemaType = {
        tenant_uuid: licenseData.tenant_uuid,
        device_id: licenseData.device_id,
        license_id: licenseData.license_id,
        channels: licenseData.channels,
        expire: licenseData.expire,
    };

    const form = useForm({
        resolver: zodResolver(LicenseSchema),
        defaultValues: initialValues,
    });

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: updateLicense,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["devices"] });
            queryClient.invalidateQueries({
                queryKey: ["editLicense", licenseData.uuid],
            });

            toast.success(data?.data.message);
            navigate("/licenses");
        },
        onError: (errors) => {
            const error = errors.message.split(":");
            const [, message] = error;

            toast.error(message);
        },
    });

    const onSubmit = (data: LicenseSchemaType) => {
        const payload = {
            license,
            data: {
                device_id: data.device_id,
                channels: data.channels,
                expire: form.getFieldState("expire").isDirty
                    ? data.expire
                    : null,
            },
        };
        mutation.mutate(payload);
    };

    return (
        <>
            <CardWrapper
                title={lang("licenses.edit.title")}
                reload={true}
                goBack={true}
            >
                <Form {...form}>
                    <form
                        className="p-10 bg-white rounded-lg shadow-lg"
                        onSubmit={form.handleSubmit(onSubmit)}
                        noValidate
                    >
                        <LicenseFormComponent
                            form={form}
                            licenseData={licenseData}
                        />

                        {/* <pre>{JSON.stringify(licenseData, null, 2)}</pre> */}

                        <div className="mt-4">
                            <Button type="submit">
                                {lang("licenses.form.update")}
                            </Button>
                        </div>
                    </form>
                </Form>

                <div className="pt-4">
                    <LicenseTrackingComponent license={license} />
                </div>
            </CardWrapper>
        </>
    );
};
