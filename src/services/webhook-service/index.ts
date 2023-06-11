import { notFoundError } from "@/errors";
import { config } from "dotenv";
import { NextFunction} from "express";
var mercadopago = require('mercadopago');

config();

async function findPurchase( idData: number, next: NextFunction) {
  try {
    if (!idData) throw notFoundError();
    console.log("quero ve se eh igual", idData)

    const payment = await mercadopago.payment.get(idData);
  
    if (!payment) throw notFoundError();
  
    const status_payment = payment.body.status;
    if (status_payment === "approved") {
    
      return console.log("approved")
    }

    return status_payment;
  } catch (error) {
    console.log(error.message);
    next(error);
  }
}


const webHookService = {
    findPurchase
}

export default webHookService