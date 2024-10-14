import { ColumnDef } from "@tanstack/react-table";
import { LicenseTrackingData } from "@/app/core/licenses/interfaces";
import { DataTableColumnHeader } from "@/components";
import { lang } from "@/helpers";
import { iDate } from "@/lib";
import { Link } from "react-router-dom";

const getDaysFromExpireField = (expire: string) => {
    switch (expire) {
        case "10Days":
            return 10;
        case "1Month":
            return 30;
        case "3Month":
            return 90;
        case "6Month":
            return 180;
        case "1Year":
            return 365;

        default:
            break;
    }
};

export const licenseTrackingColumns = (): ColumnDef<LicenseTrackingData>[] => [
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
            return iDate.formatToYMD(row.getValue("creation_date"));
        },
    },
    {
        accessorKey: "expireString",
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
                getDaysFromExpireField(row.getValue("expireString")) +
                " " +
                lang("days")
            );
        },
    },
];
