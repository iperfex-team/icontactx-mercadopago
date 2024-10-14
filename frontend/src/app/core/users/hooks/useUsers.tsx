import { getUsers } from "@/api/UserApi";
import { useQuery } from "@tanstack/react-query";
import { useUserFiltersStore } from "@/store";
import { PaginationState } from "@tanstack/react-table";

export interface IGetUsersProps {
    pagination?: PaginationState;
    offset?: number;
    search?: string;
    sort: {
        field: string;
        order: string | null;
    };
}

const useUsers = ({ search, pagination, offset, sort }: IGetUsersProps) => {
    const draw = useUserFiltersStore((state) => state.draw);

    const usersQuery = useQuery({
        queryKey: [
            "users",
            {
                draw,
                pagination,
                offset,
                search,
                sort,
            },
        ],
        queryFn: () =>
            getUsers({
                draw,
                search,
                pagination,
                offset,
                sort,
            }),
    });

    return {
        // Properties
        usersQuery,

        // Getter
        // page,
    };
};

export { useUsers };
