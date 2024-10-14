import { getLogsByDevice } from "@/api/DeviceApi";
import { IGetDataTableOptions } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";

interface IUseRowsByDevice {
    device: string;
    options: IGetDataTableOptions;
}
const useLogsByDevice = ({ device, options }: IUseRowsByDevice) => {
    const { search, sort, offset, pagination } = options;
    const logsQuery = useQuery({
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
            getLogsByDevice(device, {
                search,
                sort,
                offset,
                pagination,
            }),
        retry: false,
    });

    return { logsQuery };
};

export { useLogsByDevice };
