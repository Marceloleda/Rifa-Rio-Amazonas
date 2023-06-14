import { notFoundError } from "@/errors";
import webhookRepository from "@/repositories/webhook-repository";
import dayjs from "dayjs";
import { config } from "dotenv";
import { NextFunction} from "express";
var mercadopago = require('mercadopago');

config();

async function findPurchaseAndChangePlan( idPayment: string, next: NextFunction) {
  const date = dayjs();
  const expireAt = date.add(10, 'minutes');

  const isDayExpired = (date: any) => dayjs().date() === dayjs(date).date() ? 
  false : dayjs().isAfter(dayjs(date));
  console.log(isDayExpired(expireAt))
  try {
    if (!idPayment) throw notFoundError();

    const payment = await mercadopago.payment.get(idPayment);
  
    if (!payment) throw notFoundError();
  
    const status_payment = payment.body.status;
    console.log(status_payment)
    if (status_payment === "approved") {
      const userPlan = await webhookRepository.findByIdPurchase(idPayment)
      await webhookRepository.updateByIdStatus(idPayment)
      await webhookRepository.updateByIdPayment(userPlan)
      return 
    }
    if (isDayExpired(expireAt)) {
      await webhookRepository.updateByIdStatusCanceled(idPayment)
      mercadopago.payment.cancel(idPayment);

      return
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