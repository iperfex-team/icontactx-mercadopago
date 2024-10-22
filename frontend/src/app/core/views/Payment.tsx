import { CardWrapper } from "@/components";
import { useQuery } from "@tanstack/react-query";
import { postCreatePay } from "@/api/PayApi";
import { paymentDencode } from "@/api/ProductsApi";
import { useEffect, useState } from "react";
import { lang } from "@/helpers";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useTranslation } from "react-i18next";

initMercadoPago(import.meta.env.VITE_PAY_MP_PROD_CLIENT_ID, {
  locale: import.meta.env.VITE_PAY_MP_PROD_LOCALE,
});

export const Payment = () => {
  const [code, setCode] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [priceMP, setPriceMP] = useState<string>("");
  const [product, setProduct] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [device_uuid, setDevice_uuid] = useState<string>("");
  const [uuid, setUuid] = useState<string>("");
  const [channel, setChannel] = useState<string>("");
  const [channelName, setChannelName] = useState<string>("");
  const [expirationDate, setExpirationDate] = useState<string>("");
  const [expirationDateName, setExpirationDateName] = useState<string>("");

  const t = useTranslation();
  console.log(t)

  useEffect(() => {
    setCode(location.search.slice(4));
  }, [location.pathname]);

  const denconde = useQuery({
    queryKey: ["prueba", code],
    queryFn: () => paymentDencode(code),
    enabled: !!code,
  });

  useEffect(() => {
    if (denconde?.data?.data?.mp_country_pay) {
      setPriceMP(denconde.data.data.mp_country_pay[0].price);
      setPrice(denconde.data.data.price);
      setProduct(denconde.data.data.license_name);
      setProductDescription(denconde.data.data.license_description);
      setDevice_uuid(denconde.data.data.device);
      setChannel(denconde.data.data.channel);
      setChannelName("payment." + denconde.data.data.channel);
      setExpirationDate(denconde.data.data.expiration);
      setExpirationDateName("payment." + denconde.data.data.expiration);
      setUuid(denconde.data.data.uuid);
    }
  }, [denconde]);

  const pay = useQuery({
    queryKey: ["createPay", price, product, uuid],
    queryFn: () => postCreatePay(price, product, uuid),
    enabled: !!price && !!product && !!uuid,
  });

  return (
    <CardWrapper title={lang("payment.title")} reload={true} goBack={true}>

      <div className="flex justify-around flex-wrap">

        <div className="mb-5 p-2 w-full h-36 border-2 border-gray-300 rounded">
          {product && <p className="font-semibold text-lg mb-5">{product}</p>}
          {productDescription && <p className="text-gray-700 text-sm">{productDescription}</p>}
        </div>
      </div>

      <div className="sm:col-span-4 lg:col-span-12 mb-5">
        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
          {lang("product-pay.selectDevice")}
        </label>
        {device_uuid && <p className="text-sm">{device_uuid}</p>}
      </div>

      <div className="sm:col-span-4 lg:col-span-12 mb-5">
        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
          {lang("product-pay.channels.label")}
        </label>
        {channel && channelName && <p className="text-sm">{channel} ({lang(`${channelName}`)})</p>}
      </div>

      <div className="sm:col-span-4 lg:col-span-12 mb-5">
        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
          {lang("product-pay.expirationDate.label")}
        </label>
        {expirationDate && expirationDateName && <p className="text-sm">{expirationDate} ({lang(`${expirationDateName}`)})</p>}
      </div>

      {priceMP && <div className="sm:col-span-12 lg:col-span-12">
        <label
          htmlFor="username"
          className="block text-sm font-medium leading-6 text-gray-900 text-xl text-center mt-8 "
        >
           {lang("payment.total")}
        </label>
        <label
          htmlFor="username"
          className="block text-sm font-medium leading-6 text-gray-900 text-xl text-center mt-2 mb-8"
        >
          $ {priceMP}
        </label>
      </div>}

      <div className="flex justify-around flex-wrap">
        {pay && pay.data && (
          <div>
            <Wallet
              initialization={{
                preferenceId: String(pay.data),
                redirectMode: "modal",
              }}
            />
          </div>
        )}
      </div>
    </CardWrapper>
  );
};
