import { notFoundError, unauthorizedError } from "@/errors";
import sellerRepository from "@/repositories/sellers-repository";
import { config } from "dotenv";
import { NextFunction, Request, Response } from "express";
import planService from "../plans-service";
import { AuthenticatedRequest } from "@/middlewares";
var mercadopago = require('mercadopago');

config();

async function findPurchase(req: AuthenticatedRequest, idData: number, next: NextFunction) {
  try {
    if (!idData) throw notFoundError();

    const payment = await mercadopago.payment.get(idData);
  
    if (!payment) throw notFoundError();
  
    const status_payment = payment.body.status;
    console.log(status_payment)
    planService.updatePlanToBasic(req, status_payment)
    if (status_payment === "approved") {
    
        // const userUpdate = {
        //   ...user,
        //   plan: "Basico",
        // };
  
        // const planUpdate = await sellerRepository.updatePlan(userUpdate, userId);
      changePlan(status_payment)
      console.log("mudar plano")
    }

    return payment;
  } catch (error) {
    console.log(error.message);
    next(error);
  }
}
async function changePlan(status:string) {
  return console.log("changing", status)
}

const webHookService = {
    findPurchase,
    changePlan
}

export default webHookService