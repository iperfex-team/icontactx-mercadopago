import { PaginationState } from "@tanstack/react-table";

export interface IGetDataTableOptions {
    draw?: number;
    length?: number;
    search?: string;
    pagination?: PaginationState;
    offset?: number;
    sort: {
        field: string;
        order: string | null;
    };
}
