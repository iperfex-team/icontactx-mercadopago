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
import { getProducts,getPayment_id } from "@/api/ProductsApi";
import { useLocation } from "react-router-dom";


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
import {
  getLicensePay,
  getLicenseChannels,
  getLicenseExpirations,
  getLicensePrice,
} from "@/api/LicenseApi";






export const ProductSelect = () => {
  const location = useLocation();

  
 
 
  
  
  
  const user = useAuthStore((state) => state.user);
  // const { tenantsQuery } = useTenants();
  const [tenant, setTenant] = useState("");
  const [uuid, setUuid] = useState("");
  const [device_uuid, setDevice_uuid] = useState("");
  const [device, setDevice] = useState("");
  const [license, setLicense] = useState("");
  const [licenseName, setLicenseName] = useState("");
  const [pay, setPay] = useState(false);
  const [channel, setChannel] = useState<string>("");
  const [expiration, setExpiration] = useState<string>("");
  const [price, setPrice] = useState<string>("0");
  const [paymentId, setPaymentId] = useState<string>("0");

  useEffect(() => {

    const locationKeys = location.pathname.split("/");
    console.log("locationKeys")
    console.log(locationKeys)
    setPaymentId(locationKeys[2])
}, [location.pathname]);

 
  const licensePay = useQuery({
    queryKey: ["licensePay",],
    queryFn: () => getLicensePay(paymentId),
     enabled: !!paymentId,
  });

  const licensePayment = useQuery({
    queryKey: ["licensePay",tenant,
    uuid,
    device_uuid,
    license,
    channel,
    expiration],
    queryFn: () => getPayment_id(tenant,
    uuid,
    device_uuid,
    license,
    channel,
    expiration),
    enabled: !!tenant && !!uuid && !!device_uuid && !!license && !!channel && !!expiration && !!pay,
  });
  console.log("licensePayment")
  console.log(licensePayment)

  const payment = () => {
    setPay(true)
     
}
  


  useEffect(() => {
    if(licensePay?.data){
      setDevice_uuid(licensePay?.data?.device)
      setUuid(licensePay?.data?.uuid)
      setLicense(licensePay?.data?.license)
      setLicenseName(licensePay?.data?.license_name)
      
    }
}, [licensePay]);

  useEffect(() => {
    if(licensePayment?.data){
     
      console.log("licensePayment.data")
      console.log(licensePayment.data.encode)
      window.location.href = "/payment-method/payment_id?id=" + licensePayment.data.encode
    }
}, [licensePayment]);

  
  

  const licenseChannelsQuery = useQuery({
    queryKey: ["licenseChannels"],
    queryFn: getLicenseChannels,
  });
  const licenseExpirationQuery = useQuery({
    queryKey: ["licenseExpirations"],
    queryFn: getLicenseExpirations,
  });
  console.log("licenseChannelsQuery");
  console.log(licenseChannelsQuery.data);
  const tenantsQuery = useQuery({
    queryKey: ["tenantsForProducts"],
    queryFn: getTenantsForProducts,
    enabled: user?.level === 0,
  });
  const { tenants } = (tenantsQuery?.data as Tenants) ?? [];
  /*const devicesQuery = useQuery({
        queryKey: ["devices", tenant],
        queryFn: () => getDevicesByTenant(tenant),
        enabled: !!tenant,
    });*/
  //const numOfDevices = devicesQuery.data?.license?.length ?? 0;

  // if (numOfDevices === 1)
  //     setDevice(devicesQuery.data?.license[0]?.value as string);

  
  const priceQuery = useQuery({
    queryKey: ["licensePrices", license, channel, expiration],
    queryFn: () => getLicensePrice(license, channel, expiration),
    enabled: !!channel && !!expiration,
  });

  useEffect(() => {
    if (priceQuery?.data?.price) {
      setPrice(priceQuery?.data?.price);
    }
  }, [priceQuery]);

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

  /*useEffect(() => {
        if (numOfDevices === 1)
            setDevice(devicesQuery.data?.license[0]?.value as string);
    }, [devicesQuery.data?.license, numOfDevices]);
    // e83920e6-d4a7-42f0-adb3-53bba1bc5e94*/

  return (
    <CardWrapper title={lang("product-pay.title")}>
      <div className="grid grid-cols-1 mb-8 gap-y-6 sm:grid-cols-6 sm:gap-x-6 lg:grid-cols-12">
        {user?.level === 0 && (
          <div className="sm:col-span-4 lg:col-span-6">
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {lang("product-pay.selectTenant")}
            </label>

            <p style={{ fontSize: 14 }}>CNSoluciones</p>
          </div>
        )}

        <div className="sm:col-span-4 lg:col-span-7">
          <label
            htmlFor="username"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            {lang("product-pay.selectDevice")}
          </label>

          {device_uuid && <p style={{ fontSize: 14 }}>{device_uuid}</p>}
        </div>

        <div className="sm:col-span-4 lg:col-span-5">
          <label
            htmlFor="username"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            {lang("product-pay.licenseName.label")}
          </label>

          {licenseName && <p style={{ fontSize: 14 }}>{licenseName}</p>}
        </div>

        <div className="sm:col-span-3 lg:col-span-6">
          <label
            htmlFor="username"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            {lang("product-pay.channels.label")}
          </label>

          <ReactSelect
            className="mt-2"
            options={licenseChannelsQuery?.data?.license}
            onChange={(selectedOption) => {
              console.log(selectedOption?.value);
              selectedOption?.value && setChannel(selectedOption?.value);
            }}
            placeholder={lang("product-pay.channels.placeholder")}
          />
        </div>

        <div className="sm:col-span-3 lg:col-span-6">
          <label
            htmlFor="username"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            {lang("product-pay.expirationDate.label")}
          </label>

          <ReactSelect
            className="mt-2"
            options={licenseExpirationQuery?.data?.license}
            onChange={(selectedOption) => {
              console.log(selectedOption?.value);
              selectedOption?.value && setExpiration(selectedOption?.value);
            }}
            placeholder={lang("product-pay.expirationDate.placeholder")}
            isDisabled={!channel ? true : false}
          />
        </div>

        <div className="sm:col-span-12 lg:col-span-12">
        <label
            htmlFor="username"
            className="block text-sm font-medium leading-6 text-gray-900 text-xl text-center mt-8 "
          >
           TOTAL
          </label>
          <label
            htmlFor="username"
            className="block text-sm font-medium leading-6 text-gray-900 text-xl text-center mt-2 mb-8"
          >
          USD {price}
          </label>
        </div>

        <div className="sm:col-span-12 lg:col-span-12">
          <Button
            disabled={(!channel || !expiration) && true}
         
            onClick={() => payment()}
          >
            {lang("product-pay.submit")}
          </Button>
        </div>
      </div>

      {productsQuery.isFetching ? (
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
        <TooltipProvider disableHoverableContent={product.isActive} key={index}>
          <Tooltip disableHoverableContent={product.isActive} delayDuration={0}>
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil,
                ipsa. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quae magni, cupiditate iure voluptate ullam ipsam placeat eum
                fuga rerum voluptatem debitis omnis aliquid fugit perferendis
                similique, incidunt iste et iusto.
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
