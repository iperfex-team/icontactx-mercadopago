import { getLicenses } from "@/api/LicenseApi";
import { IGetDataTableOptions } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";

const useLicenses = ({
    search,
    sort,
    offset,
    pagination,
}: IGetDataTableOptions) => {
    const licensesQuery = useQuery({
        queryKey: [
            "licenses",
            {
                search,
                sort,
                pagination,
                offset,
            },
        ],
        queryFn: () =>
            getLicenses({
                search,
                sort,
                offset,
                pagination,
            }),
    });

    return { licensesQuery };
};

export { useLicenses };
