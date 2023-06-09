import { notFoundError } from "@/errors";
import { config } from "dotenv";
config();

import { NextFunction, Response } from "express";
// const find = await webhookRepository.findByIdPurchase(id)

async function findPurchase(idData:number, next: NextFunction) {
    if(!idData) throw notFoundError()
    var mercadopago = require('mercadopago');
    mercadopago.configurations.setAccessToken(process.env.TOKEN_MERCADOPAGO_PRODUCTION);
    const filters = {
        data: {id: idData}
      };

    mercadopago.payment.search(filters)
  .then((data: any) => {
    // Processar o pagamento encontrado
    // const payment = data.body.status;
    console.log(data);
  })
  .catch((error: any) => {
    console.log(error.message)
    next(error)
  });

}

const webHookService = {
    findPurchase
}

export default webHookService