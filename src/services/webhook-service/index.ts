import { config } from "dotenv";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";
// const find = await webhookRepository.findByIdPurchase(id)

async function findPurchase(res: Response,id:number, next: NextFunction) {
    var mercadopago = require('mercadopago');
    mercadopago.configurations.setAccessToken(process.env.TOKEN_MERCADOPAGO_PRODUCTION);

    console.log('test')

    mercadopago.payment.get(id)
  .then((data: any) => {
    // Processar o pagamento encontrado
    const payment = data.body.status;
    console.log(payment);
    res.send(payment);
  })
  .catch((error: any) => {
    next(error)
  });

}

const webHookService = {
    findPurchase
}

export default webHookService