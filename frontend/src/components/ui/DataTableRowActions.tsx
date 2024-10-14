import { Row } from "@tanstack/react-table";
import { Button } from "./button";
import { IoPencilOutline, IoTrashOutline } from "react-icons/io5";
import { DataTableConfirmModal } from "./DataTableConfirmModal";

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
    onEdit: (value: Row<TData>) => void;
    onDelete: (value: Row<TData>) => void;
    canEdit?: boolean;
    canDelete?: boolean;
}

export const DataTableRowActions = <TData,>({
    row,
    onEdit,
    onDelete,
    canEdit = true,
    canDelete = true,
}: DataTableRowActionsProps<TData>) => {
    return (
        <div className="flex items-center">
            <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => onEdit(row)}
                disabled={!canEdit}
            >
                <IoPencilOutline />
            </Button>
            <DataTableConfirmModal row={row} onConfirm={onDelete}>
                <Button variant={"ghost"} size={"icon"} disabled={!canDelete}>
                    <IoTrashOutline className="text-red-500" />
                </Button>
            </DataTableConfirmModal>
        </div>
    );
};
