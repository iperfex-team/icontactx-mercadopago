import { useTranslation } from "react-i18next";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { PaginationState, Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
    table: Table<TData>;
    pagination: PaginationState;
    totalRecords: number;
    totalRecordsFiltered?: number;
}

export function DataTablePagination<TData>({
    table,
    totalRecords,
    totalRecordsFiltered,
}: DataTablePaginationProps<TData>) {
    const { t } = useTranslation();

    return (
        <div className="flex items-center justify-between px-">
            <div className="flex items-center justify-between flex-1 space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-4">
                    {/* Showing quantity of registers */}
                    <div className="flex-1 text-sm text-muted-foreground">
                        {t("pagination.showing", {
                            from:
                                table.getState().pagination.pageIndex *
                                    table.getState().pagination.pageSize +
                                1,
                            to: Math.min(
                                (table.getState().pagination.pageIndex + 1) *
                                    table.getState().pagination.pageSize,
                                totalRecords
                            ),
                            total: totalRecordsFiltered,
                        })}{" "}
                        {t("pagination.filtered", {
                            total: totalRecords,
                        })}
                    </div>
                    {/* Rows per page picker */}
                    <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium">
                            {t("pagination.rows")}
                        </p>
                        <Select
                            value={`${table.getState().pagination.pageSize}`}
                            onValueChange={(value) => {
                                table.setPageSize(Number(value));
                                // setLength(Number(value));
                            }}
                        >
                            <SelectTrigger className="h-8 w-[70px]">
                                <SelectValue
                                    placeholder={
                                        table.getState().pagination.pageSize
                                    }
                                />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {[10, 20, 30, 40, 50].map((pageSize) => (
                                    <SelectItem
                                        key={pageSize}
                                        value={`${pageSize}`}
                                    >
                                        {pageSize}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="flex">
                    <div className="flex w-[200px] items-center justify-center text-sm font-medium">
                        {t("pagination.page")}{" "}
                        {table.getState().pagination.pageIndex + 1}{" "}
                        {t("pagination.of")} {table.getPageCount()}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            className="hidden w-8 h-8 p-0 lg:flex"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className="sr-only">Go to first page</span>
                            <DoubleArrowLeftIcon className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="outline"
                            className="w-8 h-8 p-0"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className="sr-only">Go to previous page</span>
                            <ChevronLeftIcon className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="outline"
                            className="w-8 h-8 p-0"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <span className="sr-only">Go to next page</span>
                            <ChevronRightIcon className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="outline"
                            className="hidden w-8 h-8 p-0 lg:flex"
                            onClick={() =>
                                table.setPageIndex(table.getPageCount() - 1)
                            }
                            disabled={!table.getCanNextPage()}
                        >
                            <span className="sr-only">Go to last page</span>
                            <DoubleArrowRightIcon className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
