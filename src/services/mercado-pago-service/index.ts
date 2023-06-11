import { notFoundError, unauthorizedError } from "@/errors";
import mercadoPagoRepository from "@/repositories/payments-plan-repository";
import { config } from "dotenv";
import { NextFunction} from "express";

config();

async function createPaymentPlan( payment: any, userId: number, next: NextFunction) {
  try {
    if (!userId) throw unauthorizedError();

    if (!payment) throw notFoundError();
    const createDataPaymentPlan = await mercadoPagoRepository.create(payment, userId)

    if (createDataPaymentPlan) {
    
      return createDataPaymentPlan
    }

  } catch (error) {
    console.log(error.message);
    next(error);
  }
}


const mercadoPagoService = {
    createPaymentPlan
}

export default mercadoPagoService