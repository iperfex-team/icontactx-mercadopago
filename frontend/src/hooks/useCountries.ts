import { getCountries } from "@/api/UserApi";
import { useQuery } from "@tanstack/react-query";

const useCountries = () => {
    const countriesQuery = useQuery({
        queryKey: ["countries"],
        queryFn: getCountries,
    });

    return {
        countriesQuery,
    };
};

export { useCountries };
