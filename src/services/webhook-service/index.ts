import { notFoundError } from "@/errors";
import { config } from "dotenv";
config();
import { NextFunction } from "express";
var mercadopago = require('mercadopago');
mercadopago.configurations.setAccessToken(process.env.TOKEN_MERCADOPAGO_PRODUCTION);

async function findPurchase(idData:number, next: NextFunction) {
    try{
        if(!idData) throw notFoundError()
        const payment = await mercadopago.payment.get(idData)
        return payment
    }
    catch(error){
    console.log(error.message)
    next(error)
  };
}


const webHookService = {
    findPurchase
}

export default webHookService