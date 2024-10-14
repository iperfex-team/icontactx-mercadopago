import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserData } from "@/interfaces";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
    IoAlertCircleOutline,
    IoCheckmarkCircleOutline,
    IoCreateOutline,
    IoTrashOutline,
} from "react-icons/io5";
import { translate } from "@/helpers/custom-i18n";
import { Link } from "react-router-dom";

const getLabelFromLevel = (level: number): JSX.Element => {
    switch (level) {
        case 0:
            return (
                <Badge className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-600 rounded-md bg-gray-50 ring-1 ring-inset ring-gray-500/10">
                    SuperAdmin
                </Badge>
            );
        case 1:
            return (
                <Badge className="inline-flex items-center px-2 py-1 text-xs font-medium text-yellow-800 rounded-md bg-yellow-50 ring-1 ring-inset ring-yellow-600/20">
                    TenantAdmin
                </Badge>
            );
        case 2:
            return (
                <Badge className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-700 rounded-md bg-green-50 ring-1 ring-inset ring-green-600/20">
                    Creation
                </Badge>
            );
        case 3:
            return (
                <Badge className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-700 rounded-md bg-blue-50 ring-1 ring-inset ring-blue-700/10">
                    Reporting
                </Badge>
            );
        default:
            return <Badge>Undefined</Badge>;
    }
};

export const Columns: ColumnDef<UserData>[] = [
    {
        accessorKey: "id",
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
                    {translate("users.table.header.id")}
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <div className="font-bold text-center">
                    {row.getValue("id")}
                </div>
            );
        },
    },
    {
        accessorKey: "company",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    {translate("users.table.header.company")}
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <div className="font-bold text-center">
                    <Link to={`/users/edit/${row.getValue("id")}`}>
                        {row.getValue("company")}
                    </Link>
                </div>
            );
        },
    },
    {
        accessorKey: "fullname",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    {translate("users.table.header.fullName")}
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            );
        },
    },
    {
        accessorKey: "level",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    {translate("users.table.header.level")}
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <div className="font-bold text-center">
                    {getLabelFromLevel(row.getValue("level"))}
                </div>
            );
        },
    },
    {
        accessorKey: "enabled",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    {translate("users.table.header.status")}
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const isEnable = row.getValue("enabled") === 1 ? true : false;

            return isEnable ? (
                <div className="flex items-center justify-center">
                    <IoCheckmarkCircleOutline className="w-5 h-5 text-green-400" />
                </div>
            ) : (
                <div className="flex items-center justify-center">
                    <IoAlertCircleOutline className="w-5 h-5 text-red-400 " />
                </div>
            );
        },
    },
    {
        accessorKey: "country",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    {translate("users.table.header.country")}
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const countryName = row.getValue("country");
            const countryFlag = row.original.country_flag;

            const formattedCountry = `${countryFlag} ${countryName}`;

            return (
                <div className="flex items-baseline">{formattedCountry}</div>
            );
        },
    },
    {
        accessorKey: "creation_date",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    {translate("users.table.header.creationDate")}
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return dayjs(row.getValue("creation_date")).format(
                "YYYY-MM-DD HH:mm:ss"
            );
        },
    },
    {
        accessorKey: "last_login",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    {translate("users.table.header.lastLogin")}
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return dayjs(row.getValue("last_login")).format(
                "YYYY-MM-DD HH:mm:ss"
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-8 h-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>
                            {translate("users.table.header.actions.label")}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link
                                to={`/users/edit/${row.getValue("id")}`}
                                className="flex items-center"
                            >
                                <IoCreateOutline size={20} />
                                <span className="ml-2">
                                    {translate(
                                        "users.table.header.actions.edit"
                                    )}
                                </span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex">
                            <button
                                className="flex hover:text-red-500"
                                onClick={() => console.log("Delete")}
                            >
                                <IoTrashOutline size={20} />
                                <span className="ml-2">
                                    {translate(
                                        "users.table.header.actions.delete"
                                    )}
                                </span>
                            </button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
