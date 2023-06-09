import { notFoundError } from "@/errors";
import { config } from "dotenv";
config();
import { NextFunction, Response } from "express";
// const find = await webhookRepository.findByIdPurchase(id)
var mercadopago = require('mercadopago');
mercadopago.configurations.setAccessToken(process.env.TOKEN_MERCADOPAGO_PRODUCTION);

async function findPurchase(idData:number, next: NextFunction) {
    try{
        if(!idData) throw notFoundError()
        const test = await mercadopago.payment.get(idData)
 
        console.log(test.body.status);
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