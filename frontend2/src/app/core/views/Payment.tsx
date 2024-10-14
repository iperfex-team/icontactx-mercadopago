import { CardWrapper } from "@/components";
import { useQuery } from "@tanstack/react-query";
import { getPrueba } from "@/api/AuthApi";
import { paymentDencode } from "@/api/ProductsApi";
import { useEffect, useState } from "react";
import { lang } from "@/helpers";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

initMercadoPago('APP_USR-209aa261-ff47-405b-9368-3d0a638e5743', {
  locale: "es-AR",
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
      setExpirationDateName("payment."+ denconde.data.data.expiration);
      setUuid(denconde.data.data.uuid);
    }
  }, [denconde]);

  const prueba = useQuery({
    queryKey: ["prueba", price, product, uuid],
    queryFn: () => getPrueba(price, product, uuid),
    enabled: !!price && !!product && !!uuid,
  });

  console.log("prueba");
  console.log(typeof prueba.data);
  console.log(prueba.data);

  const customization = {
    visual: {
      buttonBackground: "red",
      borderRadius: "30px",
    },
    checkout: {
      theme: {
        elementsColor: "#4287F5",
        headerColor: "#4287F5",
      },
    },
  };

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
           TOTAL A PAGAR
          </label>
          <label
            htmlFor="username"
            className="block text-sm font-medium leading-6 text-gray-900 text-xl text-center mt-2 mb-8"
          >
          $ {priceMP}
          </label>
        </div> }

      <div className="flex justify-around flex-wrap">
        {prueba && prueba.data && (
          <div>
            <Wallet
              initialization={{
                preferenceId: String(prueba.data),
                redirectMode: "modal",
              }}
            />
          </div>
        )}
      </div>
    </CardWrapper>
  );
};
