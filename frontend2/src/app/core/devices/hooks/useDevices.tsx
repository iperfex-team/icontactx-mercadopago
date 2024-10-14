import { getDevices } from "@/api/DeviceApi";

import { useQuery } from "@tanstack/react-query";
import { PaginationState } from "@tanstack/react-table";
// import { useUserFiltersStore } from "@/store";
// import { PaginationState } from "@tanstack/react-table";

interface GetDevicesProps {
    pagination?: PaginationState;
    offset?: number;
    search?: string;
    sort: {
        field: string;
        order: string | null;
    };
}

const useDevices = ({ search, sort, offset, pagination }: GetDevicesProps) => {
    // const draw = useUserFiltersStore((state) => state.draw);

    const devicesQuery = useQuery({
        queryKey: [
            "devices",
            {
                search,
                sort,
                pagination,
                offset,
            },
        ],
        queryFn: () =>
            getDevices({
                search,
                sort,
                pagination,
                offset,
            }),
        // queryFn: () =>
        //     getUsers({
        //         search,
        //         pagination,
        //         offset,
        //         sort,
        //     }),
    });

    return {
        // Properties
        devicesQuery,

        // Getter
        // page,
    };
};

export { useDevices };
