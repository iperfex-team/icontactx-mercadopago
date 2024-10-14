import { useQuery } from "@tanstack/react-query";
import { LicenseTracking } from "@/app/core/licenses/interfaces";
import { getLicenseTracking } from "@/api/LicenseApi";
import { CardWrapper, DataTable, Loading } from "@/components";
import { useDataTable } from "@/hooks";
import { licenseTrackingColumns } from "@/app/core/licenses/components";
import { lang } from "@/helpers";

export const LicenseTrackingComponent = ({ license }: { license: string }) => {
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
    } = useDataTable("device");

    const licenseTrackingQuery = useQuery<LicenseTracking>({
        queryKey: [
            "licenseTracking",
            license,
            { search, sorting, pagination, offset },
        ],
        queryFn: () =>
            getLicenseTracking(license, {
                search,
                sort: { field, order },
                offset,
                pagination,
            }),
        retry: false,
    });

    const columns = licenseTrackingColumns();

    const count = search
        ? licenseTrackingQuery.data?.recordsFiltered ?? 0
        : licenseTrackingQuery.data?.recordsTotal ?? 0;

    const pageCount =
        Math.round(count / limit) < 1 ? 1 : Math.round(count / limit);

    return licenseTrackingQuery.isLoading ? (
        <Loading />
    ) : (
        <CardWrapper title={lang("licenses.edit.licenseTracking")}>
            {/* <h1>License Tracking</h1> */}
            {/* <pre>{JSON.stringify(licenseTrackingQuery.data, null, 2)}</pre> */}

            <DataTable
                columns={columns}
                data={licenseTrackingQuery.data?.data ?? []}
                totalRecords={licenseTrackingQuery.data?.recordsTotal ?? 0}
                totalRecordsFiltered={
                    licenseTrackingQuery.data?.recordsFiltered ?? 0
                }
                search={search}
                setSearch={setSearch}
                sorting={sorting}
                onSortingChange={onSortingChange}
                pageCount={pageCount}
                pagination={pagination}
                onPaginationChange={onPaginationChange}
            />
        </CardWrapper>
    );
};
