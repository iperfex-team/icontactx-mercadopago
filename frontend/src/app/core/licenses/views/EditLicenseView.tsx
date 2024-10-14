import { Loading } from "@/components";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getLicense } from "@/api/LicenseApi";
import { EditLicenseFormView } from "@/app/core/licenses/views";

export const EditLicenseView = () => {
    const { license } = useParams();

    const licenseQuery = useQuery({
        queryKey: ["license", license],
        queryFn: () => getLicense(license ?? ""),
    });

    if (licenseQuery.isLoading) return <Loading />;

    if (licenseQuery.isError) return <Navigate to="/404" />;

    if (licenseQuery.data)
        return (
            <EditLicenseFormView
                licenseData={licenseQuery.data}
                license={license!}
            />
        );
};
