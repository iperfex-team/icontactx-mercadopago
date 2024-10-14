import { Button } from "@/components/ui/button";
import { lang } from "@/helpers";
import { DeviceData } from "@/interfaces";
import { ColumnDef, Row } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { DataTableRowActions } from "@/components";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/store";

function getPlatformUrl(platform: string) {
    let url = "";
    if (platform === "VitalPBX") {
        url = "https://vitalpbx.com/";
    } else if (platform === "IssabelPBX") {
        url = "https://www.issabel.org/";
    } else if (platform === "iContactX") {
        url = "https://www.icontactx.com/";
    } else {
        url = "https://www.freepbx.org/";
    }
    return url;
}

interface ColumnsProps {
    onEdit: (user: Row<DeviceData>) => void;
    onDelete: (user: Row<DeviceData>) => void;
    canEdit?: boolean;
    canDelete?: boolean;
}

Dayjs.extend(utc);
Dayjs.extend(timezone);

const getLabelFromPlatform = (platform: string): JSX.Element => {
    switch (platform) {
        case "VitalPBX":
            return (
                <Badge className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-700 rounded-md bg-green-50 ring-1 ring-inset ring-green-600/20 hover:bg-green-50">
                    {platform.substring(0, 12)}
                </Badge>
            );
        case "IssabelPBX":
            return (
                <Badge className="inline-flex items-center px-2 py-1 text-xs font-medium text-indigo-800 rounded-md bg-indigo-50 ring-1 ring-inset ring-indigo-600/20 hover:bg-indigo-50">
                    {platform.substring(0, 12)}
                </Badge>
            );
        case "iContactX":
            return (
                <Badge className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-md">
                    {platform.substring(0, 12)}
                </Badge>
            );
        case "FreePBX":
            return (
                <Badge className="inline-flex items-center px-2 py-1 text-xs font-medium text-[#007bff] rounded-md bg-[#007bff]/50 ring-1 ring-inset ring-[#007bff]/10 hover:bg-[#007bff]/50">
                    {platform.substring(0, 12)}
                </Badge>
            );
        default:
            return <Badge>Undefined</Badge>;
    }
};

export const deviceColumns = ({
    onEdit,
    onDelete,
}: ColumnsProps): ColumnDef<DeviceData>[] => [
    {
        accessorKey: "device",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => {
                        return column.toggleSorting(
                            column.getIsSorted() === "asc"
                        );
                    }}
                >
                    {lang("devices.table.header.device")}
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
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
        accessorKey: "company",
        header: ({ column }) => {
            return (
                <Button
                    className="w-full px-0"
                    variant="ghost"
                    onClick={() => {
                        return column.toggleSorting(
                            column.getIsSorted() === "asc"
                        );
                    }}
                >
                    <div className="flex items-center justify-center">
                        {lang("devices.table.header.company")}
                        <ArrowUpDown className="w-4 h-4 ml-2" />
                    </div>
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <div className="font-bold text-center">
                    {row.original.is_free ? (
                        <div className="flex items-center justify-center">
                            <Badge className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-700 rounded-md bg-green-50 ring-1 ring-inset ring-green-600/20 hover:bg-green-50">
                                Free
                            </Badge>
                        </div>
                    ) : (
                        <Link
                            to={`/users/edit/${row.original.tenant_id}`}
                            title={row.getValue("company")}
                        >
                            {(row.getValue("company") as string).substring(
                                0,
                                25
                            )}
                        </Link>
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: "platform",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => {
                        return column.toggleSorting(
                            column.getIsSorted() === "asc"
                        );
                    }}
                >
                    {lang("devices.table.header.platform")}
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const url = getPlatformUrl(row.original.platform);
            return (
                <div className="font-bold text-center">
                    <Link to={url}>
                        {getLabelFromPlatform(row.getValue("platform"))}
                    </Link>
                </div>
            );
        },
    },
    {
        accessorKey: "version",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => {
                        return column.toggleSorting(
                            column.getIsSorted() === "asc"
                        );
                    }}
                >
                    {lang("devices.table.header.agentVersion")}
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return <div className="text-center">{row.getValue("version")}</div>;
        },
    },
    {
        accessorKey: "ip",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => {
                        return column.toggleSorting(
                            column.getIsSorted() === "asc"
                        );
                    }}
                >
                    {lang("devices.table.header.ip")}
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <div className="font-bold text-center">
                    <Link
                        to={`https://ipinfo.io/${row.getValue("ip")}`}
                        target="_blank"
                    >
                        <div className="flex items-end">
                            <span className="mr-2">
                                {row.original.country_flag}
                            </span>
                            {row.getValue("ip")}
                        </div>
                    </Link>
                </div>
            );
        },
    },
    {
        accessorKey: "licenses",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => {
                        return column.toggleSorting(
                            column.getIsSorted() === "asc"
                        );
                    }}
                >
                    {lang("devices.table.header.licenses")}
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <div className="text-center">{row.getValue("licenses")}</div>
            );
        },
    },
    {
        accessorKey: "count_connect",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => {
                        return column.toggleSorting(
                            column.getIsSorted() === "asc"
                        );
                    }}
                >
                    {lang("devices.table.header.connections")}
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <div className="text-center">
                    {row.getValue("count_connect")}
                </div>
            );
        },
    },
    {
        accessorKey: "creation_date",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => {
                        return column.toggleSorting(
                            column.getIsSorted() === "asc"
                        );
                    }}
                >
                    {lang("devices.table.header.creationDate")}
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
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
        accessorKey: "last_connect",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => {
                        return column.toggleSorting(
                            column.getIsSorted() === "asc"
                        );
                    }}
                >
                    {lang("devices.table.header.lastConnection")}
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <div className="text-center">
                    {Dayjs.utc(row.getValue("last_connect")).format(
                        "YYYY-MM-DD HH:mm:ss"
                    )}
                </div>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <DataTableRowActions
                row={row}
                onEdit={onEdit}
                onDelete={onDelete}
                canEdit={useAuthStore.getState().user?.level === 0}
                canDelete={useAuthStore.getState().user?.level === 0}
            />
        ),
    },
];
