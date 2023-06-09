import { Response } from "express";
import { config } from "dotenv";
import httpStatus from "http-status";
import { payment_body } from "@/protocols";
config();

async function paymentPix(res:Response, body:payment_body) {
    
    var mercadopago = require('mercadopago');
    mercadopago.configurations.setAccessToken(process.env.TOKEN_MERCADOPAGO_TEST);
    
    var payment_data = {
      transaction_amount: body.value,
      description: body.name_plan,
      payment_method_id: 'pix',
      notification_url: process.env.URL_WEBHOOK,
      payer: {
        email: body.email,
        first_name: body.name_user,
        last_name: 'user',
        identification: {
            type: 'CPF',
            number: body.cpf
        }
      }
    };
    
    await mercadopago.payment.create(payment_data).then((data: any)=> {
      if(data){
        console.log("payment created")
      }
      res.send(data.body)
    }).catch(function (error:any) {
      console.log("failed payment creation")
      console.log(error.message)
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    });
}




const mercadoPagoMiddleware = {
  paymentPix
}
export default mercadoPagoMiddleware