import { getHistoryByDevice } from "@/api/DeviceApi";
import { IGetDataTableOptions } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";

interface IUseRowsByDevice {
    device: string;
    options: IGetDataTableOptions;
}
const useHistoryByDevice = ({ device, options }: IUseRowsByDevice) => {
    const { search, sort, offset, pagination } = options;
    const historyQuery = useQuery({
        queryKey: [
            "deviceLicense",
            device,
            {
                search,
                sort,
                pagination,
                offset,
            },
        ],
        queryFn: () =>
            getHistoryByDevice(device, {
                search,
                sort,
                offset,
                pagination,
            }),
        retry: false,
    });

    return { historyQuery };
};

export { useHistoryByDevice };
