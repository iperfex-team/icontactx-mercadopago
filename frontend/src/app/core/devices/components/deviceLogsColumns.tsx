import { lang } from "@/helpers";
import { Device, DeviceLogsData } from "@/app/core/devices/interfaces";
import { ColumnDef } from "@tanstack/react-table";
import Dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { DataTableColumnHeader } from "@/components";
import { Link } from "react-router-dom";
import { JsonFormatterModal } from "@/components/ui/JsonFormatterModal";
import {
    IoAlertCircleOutline,
    IoCheckmarkCircleOutline,
} from "react-icons/io5";

Dayjs.extend(utc);
Dayjs.extend(timezone);

export const deviceLogsColumns = (
    deviceData: Device
): ColumnDef<DeviceLogsData>[] => [
    {
        accessorKey: "creation_date",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader
                    column={column}
                    title={lang(
                        "devices.edit.tabs.logs.table.header.creation_date"
                    )}
                />
            );
        },
        cell: ({ row }) => {
            return (
                <div className="text-center">
                    {Dayjs.utc(row.getValue("creation_date")).format(
                        "YYYY-MM-DD HH:mm:ss"
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: "command",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader
                    column={column}
                    title={lang("devices.edit.tabs.logs.table.header.command")}
                />
            );
        },
    },
    {
        accessorKey: "status",
        header: lang("devices.edit.tabs.logs.table.header.status"),
        cell: ({ row }) => {
            return (
                <div className="flex items-center justify-center text-center gap-x-1">
                    {row.getValue("status") === "ok" ? (
                        <>
                            <IoCheckmarkCircleOutline className="w-5 h-5 font-bold text-green-500" />
                            <span className="font-bold text-green-500">OK</span>
                        </>
                    ) : (
                        <>
                            <IoAlertCircleOutline className="w-5 h-5 font-bold text-red-500" />
                            <span className="font-bold text-red-500">
                                ERROR
                            </span>
                        </>
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: "parameter",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader
                    column={column}
                    title={lang(
                        "devices.edit.tabs.logs.table.header.parameter"
                    )}
                />
            );
        },
    },
    {
        accessorKey: "ip",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader
                    column={column}
                    title={lang("devices.edit.tabs.logs.table.header.ip")}
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
        cell: () => {
            return (
                <JsonFormatterModal data={JSON.stringify(deviceData.sysinfo)} />
            );
        },
    },
];
