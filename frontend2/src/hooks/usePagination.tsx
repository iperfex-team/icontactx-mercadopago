import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";

export const usePagination = (initialSize = 10) => {
    const [pagination, setPagination] = useState<PaginationState>({
        pageSize: initialSize,
        pageIndex: 0,
    });
    const { pageSize, pageIndex } = pagination;

    return {
        pagination,
        setPagination,
        onPaginationChange: setPagination,
        limit: pageSize,
        offset: pageIndex * pageSize,
    };
};
