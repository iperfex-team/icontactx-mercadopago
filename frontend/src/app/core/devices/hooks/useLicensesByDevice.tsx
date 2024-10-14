import { getLicensesByDevice } from "@/api/DeviceApi";
import { IGetDataTableOptions } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";

interface IUseRowsByDevice {
    device: string;
    options: IGetDataTableOptions;
}
const useLicensesByDevice = ({ device, options }: IUseRowsByDevice) => {
    const { search, sort, offset, pagination } = options;
    const licenseQuery = useQuery({
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
            getLicensesByDevice(device, {
                search,
                sort,
                offset,
                pagination,
            }),
        retry: false,
    });

    return { licenseQuery };
};

export { useLicensesByDevice };
