import { useEffect, useState } from "react";
import ReactSelect from "react-select";
import {
    CardWrapper,
    Loading,
    Button,
    Alert,
    AlertDescription,
    AlertTitle,
    Input,
} from "@/components";
// import { useTenants } from "@/hooks";
import { Tenants } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/ProductsApi";
import { Products } from "@/app/core/products/interfaces";
import { Terminal } from "lucide-react";
import { cn } from "@/lib";
import { lang } from "@/helpers";
import { useTranslation } from "react-i18next";
import { useAuthStore, useCloudShellStore } from "@/store";
import { getDevicesByTenant, getTenantsForProducts } from "@/api/TenantApi";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { useCredentials } from "@/hooks";

export const ProductsView = () => {
    const user = useAuthStore((state) => state.user);

    // const { tenantsQuery } = useTenants();
    const [tenant, setTenant] = useState("");
    const [device, setDevice] = useState("");

    const tenantsQuery = useQuery({
        queryKey: ["tenantsForProducts"],
        queryFn: getTenantsForProducts,
        enabled: user?.level === 0,
    });
    const { tenants } = (tenantsQuery?.data as Tenants) ?? [];
    const devicesQuery = useQuery({
        queryKey: ["devices", tenant],
        queryFn: () => getDevicesByTenant(tenant),
        enabled: !!tenant,
    });
    const numOfDevices = devicesQuery.data?.license?.length ?? 0;

    // if (numOfDevices === 1)
    //     setDevice(devicesQuery.data?.license[0]?.value as string);

    const productsQuery = useQuery({
        queryKey: ["products", device],
        queryFn: () => getProducts(device),
        enabled: !!device,
        refetchOnWindowFocus: false,
    });
    const { t } = useTranslation();
    useEffect(() => {
        if (user?.level === 1 || user?.level === 2 || user?.level === 3) {
            setTenant(user?.tenant_uuid);
        }
    }, [user]);

    useEffect(() => {
        if (numOfDevices === 1)
            setDevice(devicesQuery.data?.license[0]?.value as string);
    }, [devicesQuery.data?.license, numOfDevices]);
    // e83920e6-d4a7-42f0-adb3-53bba1bc5e94

    return (
        <CardWrapper title={lang("products.title")}>
            <div className="grid grid-cols-1 mb-8 gap-y-6 sm:grid-cols-6 sm:gap-x-6 lg:grid-cols-12">
                {user?.level === 0 && (
                    <div className="sm:col-span-3">
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            {lang("products.selectTenant")}
                        </label>
                        <ReactSelect
                            className="mt-2"
                            options={tenants}
                            onChange={async (selectedOption) => {
                                // console.log(selectedOption);
                                setDevice("");
                                setTenant(selectedOption?.value as string);
                            }}
                            placeholder={lang("products.tenant.placeholder")}
                        />
                    </div>
                )}
                {tenant.length > 0 && (
                    <div className="sm:col-span-3 lg:col-span-6">
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            {lang("products.selectDevice")}
                        </label>
                        {numOfDevices === 1 ? (
                            <Input
                                className="mt-2"
                                value={devicesQuery.data?.license[0]?.value}
                                disabled
                            />
                        ) : (
                            <ReactSelect
                                className="mt-2"
                                options={devicesQuery.data?.license ?? []}
                                onChange={(selectedOption) => {
                                    setDevice(selectedOption?.value as string);
                                }}
                                placeholder={lang(
                                    "products.device.placeholder"
                                )}
                            />
                        )}
                    </div>
                )}
            </div>

            {tenant === "" || device === "" ? (
                <div className="flex items-center justify-center w-full mx-auto mt-16 max-w-96">
                    <Alert>
                        <Terminal className="w-8 h-8" />
                        <AlertTitle className="text-2xl">
                            {lang("products.attention.title")}
                        </AlertTitle>
                        <AlertDescription className="text-md">
                            {tenant === "" && device === "" && (
                                <p>
                                    {t("products.attention.message", {
                                        type: lang("products.tenant.label"),
                                        interpolation: { escapeValue: false },
                                    })}
                                </p>
                            )}
                            {tenant !== "" && device === "" && (
                                <p>
                                    {t("products.attention.message", {
                                        type: lang("products.device.label"),
                                        interpolation: { escapeValue: false },
                                    })}
                                </p>
                            )}
                        </AlertDescription>
                    </Alert>
                </div>
            ) : productsQuery.isFetching ? (
                <Loading />
            ) : productsQuery.isFetched ? (
                <ProductsGrid products={productsQuery.data!} device={device} />
            ) : null}
        </CardWrapper>
    );
};

const ProductsGrid = ({
    products,
    device,
}: {
    products: Products;
    device: string;
}) => {
    const { products: data } = products;
    const startCloudShell = useCloudShellStore((state) => state.createSession);
    const openCloudShell = useCloudShellStore((state) => state.openCloudShell);
    const token = useAuthStore((state) => state.token);
    const icid = useAuthStore((state) => state.icid);
    // const setLicense = useAuthStore((state) => state.setLicense);
    const { redirectTo } = useCredentials();

    const callProduct = async (lic: string, url: string) => {
        const data = {
            token: token!,
            icid: icid!,
            lic: lic!,
        };
        console.log("View Product", lic);

        redirectTo(url, data);
    };

    return (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {data.map((product, index) => (
                <TooltipProvider
                    disableHoverableContent={product.isActive}
                    key={index}
                >
                    <Tooltip
                        disableHoverableContent={product.isActive}
                        delayDuration={0}
                    >
                        <TooltipTrigger asChild>
                            <div className="flex" key={index}>
                                <article
                                    className={cn(
                                        "relative flex flex-col w-full p-6 transition bg-white rounded-3xl ring-1 ring-neutral-950/10 hover:bg-neutral-50 sm:p-8",
                                        {
                                            "opacity-50 cursor-not-allowed pointer-events-none bg-gray-100":
                                                !product.isActive,
                                        }
                                    )}
                                >
                                    <h3>
                                        <a href="#">
                                            <span className="absolute inset-0 rounded-3xl"></span>
                                        </a>
                                    </h3>
                                    <p className="mt-6 text-2xl font-semibold font-display text-neutral-950">
                                        {product.title}
                                    </p>
                                    <p className="mt-4 text-base text-neutral-600">
                                        {product.description}
                                    </p>
                                    <div className="z-50 pt-4 mt-auto">
                                        {/* <Button
                                            disabled={!product.isActive}
                                            onClick={() => {
                                                console.log("View Product");
                                                // setCloudShellOpen(true);
                                            }}
                                        >
                                            {lang("view")}
                                        </Button> */}
                                        {product.name === "CLOUDSHELL" ? (
                                            <Button
                                                disabled={!product.isActive}
                                                onClick={() => {
                                                    startCloudShell(device);
                                                    openCloudShell(true);
                                                }}
                                            >
                                                {lang("view")}
                                            </Button>
                                        ) : (
                                            <Button
                                                disabled={!product.isActive}
                                                onClick={async () => {
                                                    console.log("View Product");
                                                    await callProduct(product.lic, product.link);
                                                }}
                                            >
                                                {lang("view")}
                                            </Button>
                                        )}
                                    </div>
                                </article>
                            </div>
                        </TooltipTrigger>
                        {!product.isActive && (
                            <TooltipContent className="text-white border-none bg-neutral-950 max-w-96">
                                <TooltipArrow
                                    className="text-neutral-950 TooltipContent"
                                    width={20}
                                    height={10}
                                />
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Nihil, ipsa. Lorem ipsum dolor
                                sit amet consectetur adipisicing elit. Quae
                                magni, cupiditate iure voluptate ullam ipsam
                                placeat eum fuga rerum voluptatem debitis omnis
                                aliquid fugit perferendis similique, incidunt
                                iste et iusto.
                            </TooltipContent>
                        )}
                    </Tooltip>
                </TooltipProvider>
            ))}
        </div>
    );
};
// const BackDrop = ({ children }: { children: React.ReactNode }) => {
//     return (
//         <div>
//             <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24">
//                 <div className="fixed inset-0 transition-opacity opacity-100 backdrop-blur bg-slate-900/25"></div>
//                 <div className="relative w-full max-w-lg px-4 transition-all transform scale-100 opacity-100">
//                     {children}
//                 </div>
//             </div>
//         </div>
//     );
// };
