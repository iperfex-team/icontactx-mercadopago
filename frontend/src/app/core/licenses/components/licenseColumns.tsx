// import { ColumnsProps } from "@/interfaces";
import { Column, ColumnDef, Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, RefreshCcw } from "lucide-react";
import { lang } from "@/helpers";
import { DataTableColumnHeader, DataTableRowActions } from "@/components";
import { RestartLicenseModalComponent } from "@/app/core/licenses/components/RestartLicenseModalComponent";
import { Badge } from "@/components/ui/badge";
import { LicensesData } from "@/app/core/licenses/interfaces";
import {
    IoAlertCircleOutline,
    IoCheckmarkCircleOutline,
} from "react-icons/io5";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { iDate } from "@/lib";

interface ColumnsProps {
    onRestart: (license: Row<LicensesData>) => void;
    onEdit: (license: Row<LicensesData>) => void;
    onDelete: (license: Row<LicensesData>) => void;
}

export const licenseColumns = ({
    onRestart,
    onEdit,
    onDelete,
}: ColumnsProps): ColumnDef<LicensesData>[] => [
    {
        accessorKey: "company",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader
                    column={column}
                    title={lang("licenses.table.header.company")}
                />
            );
        },
    },
    {
        accessorKey: "enabled",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader
                    column={column}
                    title={lang("licenses.table.header.status")}
                />
            );
        },
        cell: ({ row }) => {
            const isEnable = row.getValue("enabled") === 1 ? true : false;

            return isEnable ? (
                <div className="flex items-center justify-center">
                    <IoCheckmarkCircleOutline className="w-5 h-5 font-bold text-green-400" />
                </div>
            ) : (
                <div className="flex items-center justify-center">
                    <IoAlertCircleOutline className="w-5 h-5 font-bold text-red-400 " />
                </div>
            );
        },
    },
    {
        accessorKey: "flag",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader
                    column={column}
                    title={lang("licenses.table.header.license_send_count")}
                />
            );
        },
        cell: ({ row }) => {
            return (
                <Badge
                    className={cn("text-white", {
                        "bg-green-500 rounded-md ring-green-500/10 hover:bg-green-600":
                            row.getValue("flag"),
                        "bg-red-500 ring-red-500/10 hover:bg-red-600":
                            !row.getValue("flag"),
                    })}
                >
                    {row.getValue("flag") ? "Dispatched" : "Not Dispatched"}
                </Badge>
            );
        },
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader
                    column={column}
                    title={lang("licenses.table.header.name")}
                />
            );
        },
    },
    {
        accessorKey: "device",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader
                    column={column}
                    title={lang("licenses.table.header.device")}
                />
            );
        },
        cell: ({ row }) => {
            return (
                <div className="font-bold text-center">
                    <Link to={`/devices/edit/${row.getValue("device")}`}>
                        {(row.getValue("device") as string).substring(0, 12)}
                    </Link>
                </div>
            );
        },
    },
    {
        accessorKey: "channels",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader
                    column={column}
                    title={lang("licenses.table.header.channels")}
                />
            );
        },
    },
    {
        accessorKey: "creation_date",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader
                    column={column}
                    title={lang("licenses.table.header.creation_date")}
                />
            );
        },
        cell: ({ row }) => {
            return (
                <div className="text-center">
                    {iDate.formatToYMD(row.getValue("creation_date") as string)}
                </div>
            );
        },
    },
    {
        accessorKey: "expire",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader
                    column={column}
                    title={lang("licenses.table.header.expire")}
                />
            );
        },
        cell: ({ row }) => {
            return (
                <div className="text-center">
                    {iDate.formatToYMD(row.getValue("expire") as string)}
                </div>
            );
        },
    },
    {
        accessorKey: "days",
        header: ({ column }) => {
            return (
                <ColumnHeader
                    column={column}
                    label={lang("licenses.table.header.days")}
                />
            );
        },
        cell: ({ row }) => {
            const remainingDays = iDate.diffInDays(
                row.getValue("expire") as string
            );
            return (
                <div
                    className={`text-center ${
                        remainingDays <= 20 ? "text-red-500 font-bold" : ""
                    }`}
                >
                    {remainingDays}
                </div>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <div className="flex items-center">
                <RestartLicenseModalComponent row={row} onConfirm={onRestart}>
                    <Button variant={"ghost"} size={"icon"}>
                        <RefreshCcw className="w-4 h-4 text-orange-400" />
                    </Button>
                </RestartLicenseModalComponent>
                <DataTableRowActions
                    row={row}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            </div>
        ),
    },
];

// eslint-disable-next-line react-refresh/only-export-components
const ColumnHeader = ({
    column,
    label,
}: {
    column: Column<LicensesData, unknown>;
    label: string;
}) => {
    return (
        <Button
            variant="ghost"
            onClick={() => {
                return column.toggleSorting(column.getIsSorted() === "asc");
            }}
        >
            {label}
            <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
    );
};
