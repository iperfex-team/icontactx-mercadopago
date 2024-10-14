import { deviceHistoryColumns } from "@/app/core/devices/components";
import { useDataTable } from "@/hooks";
import { DataTable } from "@/components/ui/DataTable";
import { useHistoryByDevice } from "@/app/core/devices/hooks";

export const DeviceHistoryComponent = ({ device }: { device: string }) => {
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
    } = useDataTable("version");
    const columns = deviceHistoryColumns();

    const { historyQuery } = useHistoryByDevice({
        device,
        options: {
            search,
            sort: { field, order },
            offset,
            pagination,
        },
    });

    const count = search
        ? historyQuery.data?.recordsFiltered ?? 0
        : historyQuery.data?.recordsTotal ?? 0;

    const pageCount =
        Math.round(count / limit) < 1 ? 1 : Math.round(count / limit);

    return (
        <DataTable
            columns={columns}
            data={historyQuery.data?.data ?? []}
            totalRecords={historyQuery.data?.recordsTotal ?? 0}
            totalRecordsFiltered={historyQuery.data?.recordsFiltered ?? 0}
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
