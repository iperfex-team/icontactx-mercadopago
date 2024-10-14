import { Device } from "@/app/core/devices/interfaces";
import { CardWrapper } from "@/components";
import { Form } from "@/components/ui/form";
import { Tenants } from "@/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EditDeviceSchema, EditDeviceType } from "@/app/core/devices/schemas";
import { Button } from "@/components/ui/button";
import { lang } from "@/helpers";
import {
    DeviceHistoryComponent,
    DeviceLicenseComponent,
    DeviceLogsComponent,
    EditDeviceFormComponent,
} from "@/app/core/devices/components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { freeDevice, updateDevice } from "@/api/DeviceApi";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface IEditDeviceFormViewProps {
    deviceData: Device;
    tenants: Tenants;
}
export const EditDeviceFormView = ({
    deviceData,
    tenants,
}: IEditDeviceFormViewProps) => {
    const navigate = useNavigate();

    const { tenants: tenantsData } = tenants;
    const initialValues = {
        device: deviceData.device,
        tenant: deviceData.tenant_uuid,
    };

    const form = useForm({
        resolver: zodResolver(EditDeviceSchema),
        defaultValues: initialValues,
    });

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: updateDevice,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["devices"] });
            queryClient.invalidateQueries({
                queryKey: ["editDevice", deviceData.device],
            });

            toast.success(data?.data.message);
            navigate("/devices");
        },
        onError: (errors) => {
            const error = errors.message.split(":");
            const [, message] = error;

            toast.error(message);
        },
    });

    const freeDeviceMutation = useMutation({
        mutationFn: freeDevice,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["devices"] });
            queryClient.invalidateQueries({
                queryKey: ["editDevice", deviceData.device],
            });

            toast.success(data?.data.message);
            navigate("/devices");
        },
        onError: (errors) => {
            const error = errors.message.split(":");
            const [, message] = error;

            toast.error(message);
        },
    });

    const onSubmit = (data: EditDeviceType) => {
        mutation.mutate(data);
    };

    const onFreeDevice = async (device: string) => {
        await freeDeviceMutation.mutate(device);
    };

    return (
        <CardWrapper title={lang("devices.edit.title")}>
            <section>
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div className="flex flex-col mt-4 gap-y-6 sm:flex-row sm:gap-x-4"></div>

                    <div className="flex justify-end">
                        <img
                            src={deviceData.platform_logo}
                            alt={deviceData.platform}
                            className="object-contain w-full sm:max-w-64"
                        />
                    </div>
                </div>
                <Form {...form}>
                    {/* <pre>{JSON.stringify(form.formState, null, 2)}</pre> */}
                    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
                        <EditDeviceFormComponent
                            form={form}
                            tenants={tenantsData}
                            deviceData={deviceData}
                        />
                        <div className="flex flex-col mt-4 gap-y-4 sm:flex-row gap-x-2">
                            <Button
                                type="submit"
                                className="bg-green-600 hover:bg-green-500 focus-visible:outline-green-600"
                            >
                                {lang("devices.edit.form.submit")}
                            </Button>
                            <Button
                                type="button"
                                variant={"destructive"}
                                onClick={() => window.location.reload()}
                            >
                                {lang("devices.edit.form.reset")}
                            </Button>
                            <Button
                                className="bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
                                type="button"
                                onClick={() => window.history.back()}
                            >
                                {lang("devices.edit.form.back")}
                            </Button>
                            <Button
                                type="button"
                                onClick={() => console.log("cloud shell")}
                            >
                                {lang("devices.edit.form.cloudShell")}
                            </Button>
                        </div>
                    </form>
                </Form>

                <div className="flex justify-end mt-4">
                    <Button
                        onClick={() => onFreeDevice(deviceData.device)}
                        className="w-full bg-yellow-600 hover:bg-yellow-500 focus-visible:outline-yellow-600 sm:w-auto"
                    >
                        {lang("devices.edit.free")}
                    </Button>
                </div>
            </section>

            <section className="mt-4" id="tabs">
                <Tabs defaultValue="licenses">
                    <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
                        <TabsTrigger value="licenses">
                            {lang("devices.edit.tabs.licenses.title")}
                        </TabsTrigger>
                        <TabsTrigger value="history">
                            {lang("devices.edit.tabs.history.title")}
                        </TabsTrigger>
                        <TabsTrigger value="logs">
                            {lang("devices.edit.tabs.logs.title")}
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="licenses">
                        <DeviceLicenseComponent device={deviceData.device} />
                    </TabsContent>
                    <TabsContent value="history">
                        <DeviceHistoryComponent device={deviceData.device} />
                    </TabsContent>
                    <TabsContent value="logs">
                        <DeviceLogsComponent deviceData={deviceData} />
                    </TabsContent>
                </Tabs>
            </section>
        </CardWrapper>
    );
};
