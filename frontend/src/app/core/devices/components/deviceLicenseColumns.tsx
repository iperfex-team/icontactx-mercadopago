import { lang } from "@/helpers";
import { DeviceLicenseData } from "@/app/core/devices/interfaces";
import { ColumnDef } from "@tanstack/react-table";
import Dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components";
import { cn } from "@/lib/utils";

Dayjs.extend(utc);
Dayjs.extend(timezone);

export const deviceLicenseColumns = (): ColumnDef<DeviceLicenseData>[] => [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader
                    column={column}
                    title={lang(
                        "devices.edit.tabs.licenses.table.header.device"
                    )}
                />
            );
        },
    },
    {
        accessorKey: "channels",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader
                    column={column}
                    title={lang(
                        "devices.edit.tabs.licenses.table.header.channels"
                    )}
                />
            );
        },
    },
    {
        // TODO: manejar caso cuando es distinto de 1 (color amarillo)
        accessorKey: "license_send_count",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader
                    column={column}
                    title={lang(
                        "devices.edit.tabs.licenses.table.header.license_send_count"
                    )}
                />
            );
        },
        cell: ({ row }) => {
            return (
                <Badge
                    className={cn("text-white", {
                        "bg-green-500 rounded-md ring-green-500/10 hover:bg-green-600":
                            row.getValue("license_send_count") === 1,
                        "bg-red-500 ring-red-500/10 hover:bg-red-600":
                            row.getValue("license_send_count") !== 1,
                    })}
                >
                    {row.getValue("license_send_count") === 1
                        ? "Dispatched"
                        : "Not Dispatched"}
                </Badge>
            );
        },
    },
    {
        accessorKey: "creation_date",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader
                    column={column}
                    title={lang(
                        "devices.edit.tabs.licenses.table.header.creation_date"
                    )}
                />
            );
        },
        cell: ({ row }) => {
            return (
                <div className="text-center">
                    {Dayjs.utc(row.getValue("creation_date")).format(
                        "YYYY-MM-DD"
                    )}
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
                    title={lang(
                        "devices.edit.tabs.licenses.table.header.expire"
                    )}
                />
            );
        },
        cell: ({ row }) => {
            return (
                <div className="text-center">
                    {Dayjs.utc(row.getValue("expire")).format("YYYY-MM-DD")}
                </div>
            );
        },
    },
    {
        accessorKey: "days",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader
                    column={column}
                    title={lang("devices.edit.tabs.licenses.table.header.days")}
                />
            );
        },
        cell: ({ row }) => {
            const diffInDays = Dayjs.utc(row.getValue("expire")).diff(
                Dayjs.utc(),
                "days"
            );
            return (
                <div
                    className={`text-center ${
                        diffInDays <= 20 ? "text-red-500 font-bold" : ""
                    }`}
                >
                    {diffInDays}
                </div>
            );
        },
    },
];
