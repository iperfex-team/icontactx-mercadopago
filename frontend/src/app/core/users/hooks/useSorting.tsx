import { SortingState } from "@tanstack/react-table";
import { useState } from "react";

export const useSorting = (initialField = "id", initialOrder = null) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    return {
        sorting,
        onSortingChange: setSorting,
        order: !sorting.length
            ? initialOrder
            : sorting[0].desc
            ? "desc"
            : "asc",
        field: sorting.length ? sorting[0].id : initialField,
    };
};
