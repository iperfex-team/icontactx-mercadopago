import { useCallback, useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import { CardWrapper } from "@/components";
import { deviceColumns } from "../components/deviceColumns";
import { useDevices } from "../hooks/useDevices";
import { DataTable } from "@/components/ui/DataTable";
import { usePagination, useSorting } from "@/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDevice } from "@/api/DeviceApi";
import { Row } from "@tanstack/react-table";
import { DeviceData } from "@/interfaces";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const DevicesView = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const { sorting, onSortingChange, field, order } = useSorting("company");
    const { limit, onPaginationChange, pagination, offset, setPagination } =
        usePagination();
    const { devicesQuery } = useDevices({
        search,
        sort: { field, order },
        offset,
        pagination,
    });
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: deleteDevice,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["devices"],
            });
        },
    });
    const onEdit = useCallback(
        (device: Row<DeviceData>) => {
            navigate(`/devices/edit/${device.original.device}`);
        },
        [navigate]
    );
    const onDelete = useCallback(
        (device: Row<DeviceData>) => {
            // deleteMutation.mutate(user.original.id);
            deleteMutation.mutate(device.original.device, {
                onSuccess: ({ data }) => {
                    toast.success(data.message);
                    // toast.success(data.message);
                },
                onError: (error) => {
                    toast.error(error.message);
                },
            });
        },
        [deleteMutation]
    );

    const columns = deviceColumns({ onEdit, onDelete });
    const { t } = useTranslation();

    const count = search
        ? devicesQuery.data?.recordsFiltered ?? 0
        : devicesQuery.data?.recordsTotal ?? 0;

    const pageCount =
        Math.round(count / limit) < 1 ? 1 : Math.round(count / limit);

    useEffect(() => {
        setPagination({
            pageIndex: 0,
            pageSize: 10,
        });
    }, [setPagination, search]);

    return (
        <CardWrapper title={t("devices.title")}>
            <DataTable
                columns={columns}
                data={devicesQuery.data?.data ?? []}
                totalRecords={devicesQuery.data?.recordsTotal ?? 0}
                totalRecordsFiltered={devicesQuery.data?.recordsFiltered ?? 0}
                search={search}
                setSearch={setSearch}
                onSortingChange={onSortingChange}
                sorting={sorting}
                pageCount={pageCount}
                pagination={pagination}
                onPaginationChange={onPaginationChange}
            />
        </CardWrapper>
    );
};
