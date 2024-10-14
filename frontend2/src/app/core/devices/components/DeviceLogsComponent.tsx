import { deviceLogsColumns } from "@/app/core/devices/components";
import { useDataTable } from "@/hooks";
import { DataTable } from "@/components/ui/DataTable";
import { useLogsByDevice } from "@/app/core/devices/hooks";
import { Device } from "@/app/core/devices/interfaces";

export const DeviceLogsComponent = ({ deviceData }: { deviceData: Device }) => {
    const {
        onPaginationChange,
        search,
        setSearch,
        sorting,
        onSortingChange,
        field,
        order,
        offset,
        pagination,
        limit,
    } = useDataTable("command");
    const columns = deviceLogsColumns(deviceData);

    const { logsQuery } = useLogsByDevice({
        device: deviceData.device,
        options: {
            search,
            sort: { field, order },
            offset,
            pagination,
        },
    });

    const count = search
        ? logsQuery.data?.recordsFiltered ?? 0
        : logsQuery.data?.recordsTotal ?? 0;

    const pageCount =
        Math.round(count / limit) < 1 ? 1 : Math.round(count / limit);

    return (
        <DataTable
            columns={columns}
            data={logsQuery.data?.data ?? []}
            totalRecords={logsQuery.data?.recordsTotal ?? 0}
            totalRecordsFiltered={logsQuery.data?.recordsFiltered ?? 0}
            pageCount={pageCount}
            pagination={pagination}
            onPaginationChange={onPaginationChange}
            search={search}
            setSearch={setSearch}
            sorting={sorting}
            onSortingChange={onSortingChange}
        />
    );
};
