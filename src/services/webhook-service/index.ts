import { notFoundError } from "@/errors";
import planRepository from "@/repositories/plans-repository";
import webhookRepository from "@/repositories/webhook-repository";
import { config } from "dotenv";
import { NextFunction} from "express";
var mercadopago = require('mercadopago');

config();

async function findPurchaseAndChangePlan( idPayment: string, next: NextFunction) {
  try {
    if (!idPayment) throw notFoundError();
    console.log(idPayment)
    const payment = await mercadopago.payment.get(idPayment);
  
    if (!payment) throw notFoundError();
  
    const status_payment = payment.body.status;
    const plans = await planRepository.findAllPlans()

    console.log(status_payment)
    if (status_payment === "approved") {
      const userPlan = await webhookRepository.findByIdPurchase(idPayment)
      
      await webhookRepository.updateByIdStatus(idPayment)
      const plan = await planRepository.findPlanById(userPlan)
      await webhookRepository.updatePlanByIdPayment(userPlan, plan)
      return 
    }
    if (status_payment === "cancelled") {
      await webhookRepository.updateByIdStatusCanceled(idPayment)
      return
    }

    return status_payment;
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
}


const webHookService = {
  findPurchaseAndChangePlan
}

export default webHookService