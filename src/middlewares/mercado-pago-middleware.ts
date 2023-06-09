import { Response } from "express";
import { config } from "dotenv";
import httpStatus from "http-status";
import { payment_body } from "@/protocols";
config();

async function payment(res:Response, body:payment_body) {
    
    var mercadopago = require('mercadopago');
    mercadopago.configurations.setAccessToken(process.env.TOKEN_MERCADOPAGO_TEST);
    
    var payment_data = {
      transaction_amount: body.value,
      description: body.name_plan,
      payment_method_id: 'pix',
      notification_url: "https://webhook.site/28277264-aa98-4d43-afce-7d97caeb0de5",
      payer: {
        email: body.email,
        first_name: body.name_user,
        last_name: '',
        identification: {
            type: 'CPF',
            number: '19119119100'
        },
        address:  {
            zip_code: '06233200',
            street_name: 'Av. das Nações Unidas',
            street_number: '3003',
            neighborhood: 'Bonfim',
            city: 'Osasco',
            federal_unit: 'SP'
        }
      }
    };
    
    await mercadopago.payment.create(payment_data).then((data: any)=> {
      if(data){
        console.log("cria pagamento para plano")
      }
      res.send(data.body)
    }).catch(function (error:any) {
      console.log("deu ruim na criacao de pagamento")
      console.log(error.message)
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    });
}




const mercadoPagoMiddleware = {
    payment
}
export default mercadoPagoMiddleware