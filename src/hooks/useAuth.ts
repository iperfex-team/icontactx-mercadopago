import { getUser } from "@/api/AuthApi";
// import { UserData } from "@/types/AuthSchema";

import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
        retry: 1,
        refetchOnWindowFocus: false,
    });

    return { data, isError, isLoading };

    // useEffect(() => {
    //     getUser()
    //         .then((data) => {
    //             setUser(data);
    //         })
    //         .catch(() => {
    //             setUser(null);
    //         })
    //         .finally(() => {
    //             setLoading(false);
    //         });
    // }, []);

    // return { user, loading };
};
