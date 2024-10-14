import { useState } from "react";
import { useSorting } from "./useSorting";
import { usePagination } from "./usePagination";

export const useDataTable = (key: string) => {
    const [search, setSearch] = useState("");
    const { sorting, onSortingChange, field, order } = useSorting(key);
    const { limit, onPaginationChange, pagination, offset, setPagination } =
        usePagination();

    return {
        search,
        setSearch,
        sorting,
        onSortingChange,
        field,
        order,
        limit,
        onPaginationChange,
        pagination,
        offset,
        setPagination,
    };
};
