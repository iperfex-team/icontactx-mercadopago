import { getTenants } from "@/api/TenantApi";
import { useAuthStore } from "@/store";
import { useQuery } from "@tanstack/react-query";

export const useTenants = () => {
    const user = useAuthStore((state) => state.user);

    const tenantsQuery = useQuery({
        queryKey: ["tenants"],
        queryFn: getTenants,
        enabled: user?.level === 0,
    });

    return { tenantsQuery };
};
