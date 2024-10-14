import { Column } from "@tanstack/react-table";
import { Button } from "./button";
import { ArrowUpDown } from "lucide-react";

interface DataTableColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>;
    title: string;
}
export const DataTableColumnHeader = <TData, TValue>({
    column,
    title,
}: DataTableColumnHeaderProps<TData, TValue>) => {
    return (
        <Button
            variant="ghost"
            onClick={() => {
                return column.toggleSorting(column.getIsSorted() === "asc");
            }}
        >
            {title}
            <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
    );
};
