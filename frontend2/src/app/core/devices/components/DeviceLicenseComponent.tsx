import { deviceLicenseColumns } from "@/app/core/devices/components/deviceLicenseColumns";
import { useDataTable } from "@/hooks";
import { DataTable } from "@/components/ui/DataTable";
import { useLicensesByDevice } from "../hooks";

export const DeviceLicenseComponent = ({ device }: { device: string }) => {
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
    } = useDataTable("name");
    const columns = deviceLicenseColumns();

    const { licenseQuery } = useLicensesByDevice({
        device,
        options: {
            search,
            sort: { field, order },
            offset,
            pagination,
        },
    });

    const count = search
        ? licenseQuery.data?.recordsFiltered ?? 0
        : licenseQuery.data?.recordsTotal ?? 0;

    const pageCount =
        Math.round(count / limit) < 1 ? 1 : Math.round(count / limit);

    return (
        <DataTable
            columns={columns}
            data={licenseQuery.data?.data ?? []}
            totalRecords={licenseQuery.data?.recordsTotal ?? 0}
            totalRecordsFiltered={licenseQuery.data?.recordsFiltered ?? 0}
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
