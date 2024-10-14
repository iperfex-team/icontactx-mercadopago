import { Loading } from "@/components";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import { EditDeviceFormView } from "./EditDeviceFormView";
import { getDevice } from "@/api/DeviceApi";
import { useTenants } from "@/hooks";

export const EditDeviceView = () => {
    const { device } = useParams();

    const deviceQuery = useQuery({
        queryKey: ["editDevice", device],
        queryFn: () => getDevice(device!),
        retry: false,
    });
    const { tenantsQuery } = useTenants();

    if (deviceQuery.isLoading || tenantsQuery.isLoading) return <Loading />;

    if (deviceQuery.isError) return <Navigate to="/404" />;

    if (deviceQuery.data)
        return (
            <EditDeviceFormView
                deviceData={deviceQuery.data}
                tenants={tenantsQuery.data!}
            />
        );
};
