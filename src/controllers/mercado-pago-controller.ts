import { NextFunction, Response } from "express";
import { config } from "dotenv";
import httpStatus from "http-status";
import { payment_body } from "@/protocols";
import dayjs from "dayjs";
import { unauthorizedError } from "@/errors";
import mercadoPagoService from "@/services/mercado-pago-service";
config();

async function paymentPix(res:Response, body:payment_body, userId: number, next: NextFunction) {
  if(!userId) throw unauthorizedError()
  const date = dayjs();
  const expireAt = date.add(15, 'minutes');

    var mercadopago = require('mercadopago');
    mercadopago.configurations.setAccessToken(process.env.TOKEN_MERCADOPAGO_PRODUCTION);
    
    var payment_data = {
      transaction_amount: body.value,
      description: body.name_plan,
      payment_method_id: 'pix',
      date_of_expiration: expireAt,
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