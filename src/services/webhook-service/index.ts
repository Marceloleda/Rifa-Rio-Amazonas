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
    const payment = data;
    console.log(payment);
    res.send(payment);
  })
  .catch((error: any) => {
    console.log("Falha ao buscar pagamento:", error);
    next(error)
  });

}

const webHookService = {
    findPurchase
}

export default webHookService