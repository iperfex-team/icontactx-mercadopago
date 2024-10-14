import { useCallback, useEffect, useState } from "react";

import { DataTable } from "@/components/ui/DataTable";
import { CardWrapper } from "@/components";

import { useUsers } from "../users/hooks";
import { usePagination } from "../users/hooks/usePagination";
import { useTranslation } from "react-i18next";
import { useSorting } from "../users/hooks/useSorting";
import { userColumns } from "../users";
import { UserData } from "@/interfaces";
import { Row } from "@tanstack/react-table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "@/api/UserApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const UsersView = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const { limit, onPaginationChange, pagination, offset, setPagination } =
        usePagination();
    const { sorting, onSortingChange, field, order } = useSorting("id");
    const { usersQuery } = useUsers({
        search,
        pagination,
        offset,
        sort: { field, order },
    });
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: deleteUser,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },
    });

    const onEdit = useCallback(
        (user: Row<UserData>) => {
            navigate(`/users/edit/${user.original.id}`);
        },
        [navigate]
    );
    const onDelete = useCallback(
        (user: Row<UserData>) => {
            // deleteMutation.mutate(user.original.id);
            deleteMutation.mutate(user.original.id, {
                onSuccess: ({ data }) => {
                    toast.success(data.message);
                },
                onError: (error) => {
                    toast.error(error.message);
                },
            });
        },
        [deleteMutation]
    );

    const columns = userColumns({ onEdit, onDelete });
    const { t } = useTranslation();

    const count = search
        ? usersQuery.data?.recordsFiltered ?? 0
        : usersQuery.data?.recordsTotal ?? 0;
    const pageCount =
        Math.round(count / limit) < 1 ? 1 : Math.round(count / limit);

    useEffect(() => {
        setPagination({
            pageIndex: 0,
            pageSize: 10,
        });
    }, [setPagination, search]);

    return (
        <CardWrapper
            title={t("users.title")}
            actionLabel={t("users.add.title")}
            actionHref="/users/create"
        >
            <DataTable
                columns={columns}
                data={usersQuery.data?.data ?? []}
                totalRecords={usersQuery.data?.recordsTotal ?? 0}
                totalRecordsFiltered={usersQuery.data?.recordsFiltered ?? 0}
                pageCount={pageCount}
                pagination={pagination}
                onPaginationChange={onPaginationChange}
                search={search}
                setSearch={setSearch}
                onSortingChange={onSortingChange}
                sorting={sorting}
            />
        </CardWrapper>
    );
};
