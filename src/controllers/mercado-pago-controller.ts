import { NextFunction, Response } from "express";
import { config } from "dotenv";
import { payment_body } from "@/protocols";
import dayjs from "dayjs";
import { unauthorizedError } from "@/errors";
import mercadoPagoService from "@/services/mercado-pago-service";
config();

async function paymentPix(res:Response, body:payment_body, userId: number, next: NextFunction) {
  if(!userId) throw unauthorizedError()
  const date = dayjs();
  const expireAt = date.add(10, 'minutes');

    var mercadopago = require('mercadopago');
    mercadopago.configurations.setAccessToken(process.env.TOKEN_MERCADOPAGO_PRODUCTION);
    
    const decimalPrice = body.value;
    const numberPrice = decimalPrice.toNumber();


    var payment_data = {
      transaction_amount: numberPrice,
      description: body.name_plan,
      payment_method_id: 'pix',
      date_of_expiration: expireAt,
      additional_info: {
        items:
          {
            "id": "MLB2907679857",
            "title": "Point Mini",
            "description": "Producto Point para cobros con tarjetas mediante bluetooth",
            "picture_url": "https://http2.mlstatic.com/resources/frontend/statics/growth-sellers-landings/device-mlb-point-i_medium@2x.png",
            "category_id": "electronics",
            "quantity": 1,
            "unit_price": 58.8
          }
          
      },
      payer: {
        email: body.email,
        first_name: body.name_user,
        last_name: '',
        identification: {
            type: 'CPF',
            number: body.cpf
        }
      }
    };
    try{
      const payment = await mercadopago.payment.create(payment_data)
      if(payment){
        await mercadoPagoService.createPaymentPlan(payment.body, userId, next)
        console.log("payment created")
      }
      return res.send(payment.body)
    }
    catch(error) {
      console.log("failed payment creation")
      console.log(error.message)
      next(error)
    };
}



const mercadoPago = {
  paymentPix
}
export default mercadoPago