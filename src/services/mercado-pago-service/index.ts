import { notFoundError, unauthorizedError } from "@/errors";
import { config } from "dotenv";
import { NextFunction} from "express";

config();

async function createPaymentPlan( payment: any, userId: number, next: NextFunction) {
  try {
    if (!userId) throw unauthorizedError();

    if (!payment) throw notFoundError();
    return console.log("teste create payment plan", payment.id)
    // const createDataPaymentPlan = await mercadoPagoRepository.create(payment, userId)
    // const status_payment = payment.body.status;
    // if (status_payment === "approved") {
    
    //   return console.log("approved")
    // }

    // return status_payment;
  } catch (error) {
    console.log(error.message);
    next(error);
  }
}


const mercadoPagoService = {
    createPaymentPlan
}

export default mercadoPagoService