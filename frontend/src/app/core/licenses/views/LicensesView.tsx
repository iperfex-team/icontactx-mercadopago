import { useDataTable } from "@/hooks";
import { licenseColumns } from "@/app/core/licenses/components";
import { CardWrapper } from "@/components";
import { DataTable } from "@/components/ui/DataTable";
import { useLicenses } from "@/app/core/licenses/hooks";
import { lang } from "@/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLicense, restartLicense } from "@/api/LicenseApi";
import { useCallback } from "react";
import { Row } from "@tanstack/react-table";
import { LicensesData } from "@/app/core/licenses/interfaces";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const LicensesView = () => {
    const navigate = useNavigate();
    // const [search, setSearch] = useState("");
    // const { sorting, onSortingChange } = useSorting("company");
    // const { onPaginationChange, pagination } = usePagination();

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

    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: deleteLicense,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["licenses"],
            });
        },
    });

    const restartMutation = useMutation({
        mutationFn: restartLicense,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["licenses"],
            });
        },
    });

    const onRestart = useCallback(
        (license: Row<LicensesData>) => {
            // deleteMutation.mutate(user.original.id);
            restartMutation.mutate(license.original.uuid, {
                onSuccess: ({ data }) => {
                    toast.success(data.message);
                    // toast.success(data.message);
                },
                onError: (error) => {
                    toast.error(error.message);
                },
            });
        },
        [restartMutation]
    );
    const onEdit = useCallback(
        (license: Row<LicensesData>) => {
            navigate(`/licenses/edit/${license.original.uuid}`);
        },
        [navigate]
    );
    const onDelete = useCallback(
        (license: Row<LicensesData>) => {
            // deleteMutation.mutate(user.original.id);
            deleteMutation.mutate(license.original.uuid, {
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

    const columns = licenseColumns({ onRestart, onEdit, onDelete });

    const { licensesQuery } = useLicenses({
        search,
        sort: { field, order },
        offset,
        pagination,
    });

    const count = search
        ? licensesQuery.data?.recordsFiltered ?? 0
        : licensesQuery.data?.recordsTotal ?? 0;

    const pageCount =
        Math.round(count / limit) < 1 ? 1 : Math.round(count / limit);

    return (
        <CardWrapper
            title={lang("licenses.title")}
            actionLabel={lang("licenses.add.title")}
            actionHref="/licenses/create"
        >
            <DataTable
                columns={columns}
                data={licensesQuery.data?.data ?? []}
                totalRecords={licensesQuery.data?.recordsTotal ?? 0}
                totalRecordsFiltered={licensesQuery.data?.recordsFiltered ?? 0}
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
