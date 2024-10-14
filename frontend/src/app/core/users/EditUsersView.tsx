import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/UserApi";
import { Loading } from "@/components";
import { EditUserForm } from "./components/EditUserForm";
import { useCountries } from "@/hooks";

export const EditUsersView = () => {
    const { id } = useParams();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["editUser", id],
        queryFn: () => getUser(id!),
        retry: false,
    });
    const { countriesQuery } = useCountries();

    if (isLoading || countriesQuery.isLoading) return <Loading />;

    if (isError) return <Navigate to="/404" />;

    if (data)
        return <EditUserForm data={data} country={countriesQuery.data!} />;
};
