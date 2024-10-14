import { Row } from "@tanstack/react-table";

export interface ColumnsProps<TData> {
    onEdit: (row: Row<TData>) => void;
    onDelete: (row: Row<TData>) => void;
}
