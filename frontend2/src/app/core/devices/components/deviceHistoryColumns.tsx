import { lang } from "@/helpers";
import { DeviceHistoryData } from "@/app/core/devices/interfaces";
import { ColumnDef } from "@tanstack/react-table";
import Dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { DataTableColumnHeader } from "@/components";
import { Link } from "react-router-dom";
import { JsonFormatterModal } from "@/components/ui/JsonFormatterModal";

Dayjs.extend(utc);
Dayjs.extend(timezone);

export const deviceHistoryColumns = (): ColumnDef<DeviceHistoryData>[] => [
    {
        accessorKey: "version",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader
                    column={column}
                    title={lang(
                        "devices.edit.tabs.history.table.header.version"
                    )}
                />
            );
        },
    },
    {
        accessorKey: "date_connect",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader
                    column={column}
                    title={lang(
                        "devices.edit.tabs.history.table.header.date_connect"
                    )}
                />
            );
        },
        cell: ({ row }) => {
            return (
                <div className="text-center">
                    {Dayjs.utc(row.getValue("date_connect")).format(
                        "YYYY-MM-DD HH:mm:ss"
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: "ip",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader
                    column={column}
                    title={lang("devices.edit.tabs.history.table.header.ip")}
                />
            );
        },
        cell: ({ row }) => {
            return (
                <div className="font-bold text-center">
                    <Link
                        to={`https://ipinfo.io/${row.getValue("ip")}`}
                        target="_blank"
                    >
                        {row.getValue("ip")}
                    </Link>
                </div>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <JsonFormatterModal
                    data={JSON.stringify(row.original.sysinfo)}
                />
            );
        },
    },
];
