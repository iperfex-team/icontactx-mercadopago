import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
    LicenseSchema,
    type LicenseSchemaType,
} from "@/app/core/licenses/types";
import { CardWrapper } from "@/components";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { LicenseFormComponent } from "@/app/core/licenses/components";
import { z } from "zod";
import { lang } from "@/helpers";
import { useMutation } from "@tanstack/react-query";
import { registerLicense } from "@/api/LicenseApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const initialValues: LicenseSchemaType = {
    tenant_uuid: "",
    device_id: "",
    license_id: "",
    channels: "",
    expire: "",
};
export const CreateLicenseView = () => {
    const navigate = useNavigate();
    const form = useForm({
        resolver: zodResolver(LicenseSchema),
        defaultValues: initialValues,
    });

    const mutation = useMutation({
        mutationFn: registerLicense,
        onSuccess: (data) => {
            toast.success(data.data.message);
            navigate("/licenses");
        },
        onError: (errors) => {
            const error = errors.message.split(":");
            const [key, message] = error;

            form.setError(
                key as keyof LicenseSchemaType,
                {
                    type: "server side",
                    message,
                },
                { shouldFocus: true }
            );
            toast.error(message);
        },
    });

    const onSubmit: SubmitHandler<LicenseSchemaType> = (
        data: z.infer<typeof LicenseSchema>
    ) => {
        // console.log(data);
        mutation.mutate(data);
    };

    return (
        <CardWrapper
            title={lang("licenses.add.title")}
            reload={true}
            goBack={true}
        >
            <Form {...form}>
                <form
                    className="p-10 bg-white rounded-lg shadow-lg"
                    onSubmit={form.handleSubmit(onSubmit)}
                    noValidate
                >
                    <LicenseFormComponent form={form} />

                    <div className="mt-4">
                        <Button type="submit">
                            {lang("licenses.form.submit")}
                        </Button>
                    </div>
                </form>
            </Form>
        </CardWrapper>
    );
};
