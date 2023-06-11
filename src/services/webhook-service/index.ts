import { notFoundError } from "@/errors";
import webhookRepository from "@/repositories/webhook-repository";
import { config } from "dotenv";
import { NextFunction} from "express";
var mercadopago = require('mercadopago');

config();

async function findPurchaseAndChangePlan( idPayment: any, next: NextFunction) {
  try {
    if (!idPayment) throw notFoundError();

    const payment = await mercadopago.payment.get(idPayment);
  
    if (!payment) throw notFoundError();
  
    const status_payment = payment.body.status;
    if (status_payment === "approved") {
      const userPlan = await webhookRepository.findByIdPurchase(idPayment)
      
      return console.log(userPlan)
    }

    return status_payment;
  } catch (error) {
    console.log(error.message);
    next(error);
  }
}


const webHookService = {
  findPurchaseAndChangePlan
}

export default webHookService