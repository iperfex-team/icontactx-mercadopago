import {
    ColumnDef,
    OnChangeFn,
    PaginationState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { IoCloseOutline } from "react-icons/io5";
import { DataTablePagination } from "./DataTablePagination";
import { Button } from "./button";
import { Input } from "./input";
import {
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    Table,
} from "./table";
import { CSSProperties, useEffect, useState } from "react";
// import { DotLoader } from "react-spinners";
import { useTranslation } from "react-i18next";

const DEFAULT_REACT_TABLE_COLUMN_WIDTH = 150;
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    totalRecords: number;
    totalRecordsFiltered?: number;
    pageCount: number;
    pagination: {
        pageSize: number;
        pageIndex: number;
    };
    onPaginationChange: OnChangeFn<PaginationState>;
    search: string;
    setSearch: (value: string) => void;
    sorting: SortingState;
    onSortingChange: OnChangeFn<SortingState>;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    totalRecords,
    totalRecordsFiltered,
    pageCount,
    pagination,
    sorting,
    onPaginationChange,
    onSortingChange,
    search,
    setSearch,
}: DataTableProps<TData, TValue>) {
    // const [sorting, setSorting] = useState<SortingState>([]);
    const [query, setQuery] = useState("");
    const { t } = useTranslation();

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        enableSortingRemoval: false,
        onSortingChange,
        getSortedRowModel: getSortedRowModel(),
        manualPagination: true,
        manualSorting: true,
        onPaginationChange,
        pageCount,
        state: {
            sorting,
            pagination,
        },
    });

    useEffect(() => {
        const timeOutId = setTimeout(() => setSearch(query), 500);
        return () => clearTimeout(timeOutId);
    }, [query, search, setSearch]);

    return (
        <div>
            {/* Input search global */}
            <div className="relative w-full max-w-sm py-4 ">
                <Input
                    placeholder={t("search.placeholder")}
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    {search && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                                setSearch("");
                                setQuery("");
                            }}
                            asChild
                        >
                            <IoCloseOutline
                                className="w-5 h-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </Button>
                    )}
                </div>
            </div>

            {/* Table */}
            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    const styles: CSSProperties =
                                        header.getSize() !==
                                        DEFAULT_REACT_TABLE_COLUMN_WIDTH
                                            ? { width: `${header.getSize()}px` }
                                            : {};
                                    return (
                                        <TableHead
                                            className="text-center"
                                            key={header.id}
                                            style={styles}
                                            {...(header.column.getCanSort()
                                                ? {
                                                      onClick:
                                                          header.column.getToggleSortingHandler(),
                                                  }
                                                : {})}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "Selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="text-center"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    {/* <div className="fixed inset-0 backdrop-blur-sm backdrop-opacity-15">
                                        <div className="flex items-center justify-center min-h-screen">
                                            <DotLoader color="#d67436" />
                                        </div>
                                    </div> */}
                                    Not results found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="mt-4">
                {/* <pre>{JSON.stringify(pagination, null, 2)}</pre> */}

                <DataTablePagination
                    table={table}
                    pagination={pagination}
                    totalRecords={totalRecords}
                    totalRecordsFiltered={totalRecordsFiltered}
                />
            </div>
        </div>
    );
}
