
import {
    CardWrapper,

} from "@/components";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";



import { lang } from "@/helpers";
import { useQuery } from "@tanstack/react-query";
import { getPaymentMethods, paymentDencode } from "@/api/ProductsApi";

export const PaymentMethod = () => {


  const location = useLocation();

  const [code, setCode] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  

  useEffect(() => {

    setCode(location.search.slice(4));

}, [location.pathname]);


  const pays = useQuery({
    queryKey: ["prueba"],
    queryFn: getPaymentMethods,
  });



  const denconde = useQuery({
    queryKey: ["prueba", code],
    queryFn: () => paymentDencode(code),
    enabled: !!code
  });

  useEffect(() => {
if(denconde?.data?.data?.price){

  setPrice(denconde.data.data.price);
}

}, [denconde]);

 console.log("price")
 console.log(price)
   
    return (
        <CardWrapper title={lang("payment-method.title")}>

<div style={{display: "flex", justifyContent:"space-evenly", flexWrap: "wrap"}}>
           {pays?.data?.data.map((pay) => {
return <div onClick={() => window.location.href = "/payment/payment_id?id=" + code} style={{transition: "border-color 0.2s",cursor:"pointer" ,padding:10,width: 180, height: 260, border: "solid 2px #00000024", borderRadius: 10}} onMouseEnter={(e) => e.currentTarget.style.borderColor = "#31353dd6"}
  onMouseLeave={(e) => e.currentTarget.style.borderColor = "#00000024"} >
               <div style={{height:113,display: "flex", justifyContent:"center", flexWrap: "wrap", width: "100%"}}>
              { pay.name == "Binance" ?  <img
                                  src={pay.logo}
                                  alt=""
                                  width="120px"
                                  
                                  style={{height: 90, position: "relative", top: 10}}
                                />:
                                <img
                                src={pay.logo}
                                alt=""
                                width="120px"
                                height="35px"
                                
                              />
                            }
                              </div> 
                              
              <p style={{fontSize:12, marginBottom:20, height:72}}>{pay.description}</p>
             {price && <p style={{color: "#31353d",fontSize:15, fontWeight: 600, textAlign:"center"}}>$ {price}</p> }
               </div>

} )}
</div>
                   
                   
                

           
        </CardWrapper>
    );
};


