import { notFoundError, unauthorizedError } from "@/errors";
import sellerRepository from "@/repositories/sellers-repository";
import { config } from "dotenv";
import { NextFunction, Request, Response } from "express";
var mercadopago = require('mercadopago');

config();

async function findPurchase(userId: number, idData: number, next: NextFunction) {
    try {
      if (!idData) throw notFoundError();
  
      const payment = await mercadopago.payment.get(idData);
  
      if (!payment) throw notFoundError();
  
      const status_payment = payment.body.status;
  
      if (status_payment === "approved") {
        if (!userId) throw unauthorizedError();
  
        const user = await sellerRepository.findByUserId(userId);
  
        const userUpdate = {
          ...user,
          plan: "Basico",
        };
  
        const planUpdate = await sellerRepository.updatePlan(userUpdate, userId);
        console.log(planUpdate)
        return planUpdate;
      }
      console.log(payment)

      return payment;
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

const webHookService = {
    findPurchase
}

export default webHookService