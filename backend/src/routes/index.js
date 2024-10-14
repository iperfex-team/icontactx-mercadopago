require('dotenv').config();
const { Router } = require('express');
const axios = require("axios").default;
const {MercadoPagoConfig, Preference} = require("mercadopago");
const crypto = require('crypto');
const { Console } = require('console');



  
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const API_KEY = 'hkrflab2yrp1x4bsz0hk41fmeavnyogfpe3ja8etv6ejwshtibynaowaioayoyue';
const API_SECRET = 'qxr4xvxfzrdrv78rbcxizqek6jbjs1eijbncqhmsamgvrtz6do7gf1wfgcgwn1p3';

// Función para crear firma (Signature)
const generateSignature = (timestamp, nonce, payload, secretKey) => {
  const content = `${timestamp}\n${nonce}\n${payload}\n`;
  const hmac = crypto.createHmac('sha512', secretKey);
  return hmac.update(content).digest('hex').toUpperCase();
};
const re = [];
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.post("/mercado_pago", async (req, res) => {
  try{
    console.log(req.body)
    const {price, product, uuid} = req.body
   
  
      
    
      
      
      
      
  
      const client = new MercadoPagoConfig({ accessToken: "APP_USR-3114560980465642-091015-6c8a3448d8be168625906a19964c9e7a-1979762851"});
      const preference = new Preference(client);
  
      preference.create({ body: {
        
        
        items: [
          {
            id: '234',
            title: product,
          unit_price: parseInt(price),
          quantity: 1,
          currency_id: 'ARS',
          }
        ],
     
        auto_return: "all",
        external_reference: uuid,
        notification_url: 'https://api.getpromp.net/api/v2/pay-mp-ar/confirm/payment',
        binary_mode:true,
        back_urls: {
          success: "http://localhost:5173/products/",
        failure:`http://localhost:5175/product-pay/${uuid}`,
        pending: ""
      },
      statement_descriptor: "icontact",
      payment_methods: {
        default_payment_method_id: null,
        excluded_payment_methods: [],
        excluded_payment_types: [
              {
                  id: "ticket"
              }
        ],
        installments: 1,
    
      },
      } }).then(function (response) {
        console.log("responsing")
        console.log(response)
        res.json(response.id,
         );
      }).catch(function (error) {
        console.log("hola")
        console.log(error);
      });
    

    
  }catch(e){
    console.log("errore")
    console.log(e)
  }
    });
  
router.post('/create-order', async (req, res) => {
      const { price, uuid } = req.body;

      console.log(price,uuid)



      const user = "prod"; // Cambia a "dev" para credenciales de prueba
    
      const clientId = user === "dev"
        ? 'AYR8SX6CvLrSHPBh6oidmq3EG-ECJmLIaEynLFqj9u0fKBvQhmyyw320IP0rotjgojhnp0gCHTXQ6OJB'
        : 'ATKt9ogcXvE5dBN777XZFmjHIBErydwh2piFmvVN_lMoqtAJcDNoNjARpjLyJw67EdU-MIX3h1a9gGDt';
    
      const clientSecret = user === "dev"
        ? 'EArY-LzB1M746QSBsbMTDyFQ7DFiTVsEv8VNbkLJdTQVQOJgxHyiO4i4BAQi9F1zucR9tTey4nYvByjc'
        : 'EGbqEUTx_Co4uKxki1QfMYCRWWnSzvbGospfw9D5SCt--fI_QgI7cwur0xBtlvaxwkWinYt_hKzTLGYa';



        const urlToken = user === "dev"
        ? 'https://api-m.sandbox.paypal.com/v1/oauth2/token'
        : 'https://api-m.paypal.com/v1/oauth2/token';

        const urlOrder = user === "dev"
        ? 'https://api-m.sandbox.paypal.com/v2/checkout/orders'
        : 'https://api-m.paypal.com/v2/checkout/orders';



      try {
        // Obtén el token de acceso de PayPal
        const authResponse = await axios({
          url: `${urlToken}`,
          method: 'post',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
          },
          data: 'grant_type=client_credentials'
        });
    
        const accessToken = authResponse.data.access_token;

        console.log("access_token")
        console.log(accessToken)
    
        // Crear la orden
        const orderResponse = await axios({
          url: `${urlOrder}`,
          method: 'post',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          data: {
            intent: 'CAPTURE',
            purchase_units: [
              {
                reference_id: uuid, // Asigna el UUID personalizado para verificar en el webhook
                amount: {
                  currency_code: 'USD',
                  value: "0.01"
                  //value: price
                }
              }
            ]
          }
        });
    
        // Devuelve la respuesta de la orden al frontend
        console.log("orderResponse")
        console.log(orderResponse)
        res.json(orderResponse.data);
    
      } catch (error) {
        console.error('Error creando la orden:', error);
        res.status(500).send('Error creando la orden');
      }
    });



    router.post("/create-binance-pay", async (req, res) => {
      const { price, currency } = req.body; // Datos del frontend
      console.log(price);
      console.log(currency);
  
      const data = {
          env: {
              terminalType: "WEB" // O WEB, según el tipo de terminal
          },
          merchantTradeNo: Date.now().toString(), // Número único de comercio
          orderAmount: price, // Cantidad de la orden en cripto
          currency: currency, // Moneda de pago
          goods: {
              goodsType: "02", // Tangible Goods
              goodsCategory: "Z000", // Categoría de comida
              referenceGoodsId: "3453", // ID del producto
              goodsName: "Survey Incoming", // Nombre del producto
              goodsDetail: "The incoming survey" // Detalles
          },
          returnUrl: "http://localhost:5173/products",
          cancelUrl: "http://localhost:5173/products",
          webhookUrl: "https://soltalo.com/api/v1/productsVendor/test_b",
      };
  
      const payload = JSON.stringify(data);
      const timestamp = Date.now();
      const nonce = generateNonce(); // Generar nonce de 32 caracteres
  
      // Generar firma para autenticación
      const signature = generateSignature(timestamp, nonce, payload, API_SECRET);

      console.log("API_KEY")
      console.log(API_KEY)
      console.log(API_SECRET)
      
      try {
          // Solicitud a la API de Binance Pay
          const response = await axios.post('https://bpay.binanceapi.com/binancepay/openapi/v2/order', payload, {
              headers: {
                  'Content-Type': 'application/json',
                  'BinancePay-Certificate-SN': API_KEY,
                  'BinancePay-Timestamp': timestamp.toString(),
                  'BinancePay-Nonce': nonce,
                  'BinancePay-Signature': signature,
              }
          });
          console.log("response")
          console.log(response)
          const qrCodeLink = response.data.data.qrcodeLink;
          const checkoutUrl = response.data.data.universalUrl;
          res.json({ qrCodeLink: qrCodeLink, checkoutUrl:checkoutUrl});
      } catch (error) {
          console.error(error.response ? error.response.data : error.message);
          res.status(500).send('Error generando el QR');
      }
  });
  
  // Función para generar un nonce aleatorio de 32 caracteres
  const generateNonce = () => {
      const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let nonce = '';
      for (let i = 0; i < 32; i++) {
          nonce += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return nonce;
  };
  
    
    module.exports = router;


module.exports = router;
