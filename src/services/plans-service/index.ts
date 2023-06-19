import mercadoPago from "@/controllers/mercado-pago-controller";
import { conflictError, notFoundError, notModifiedError, unauthorizedError } from "@/errors";
import planRepository from "@/repositories/plans-repository";
import sellerRepository from "@/repositories/sellers-repository";
import dayjs from "dayjs";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";

async function searchPayment(res: Response, payment_id: string, next: NextFunction) {
    var mercadopago = require('mercadopago');
    mercadopago.configurations.setAccessToken(process.env.TOKEN_MERCADOPAGO_PRODUCTION);
    try{
        const searchResult = await mercadopago.payment.get(payment_id);
        return res.status(httpStatus.OK).send(searchResult.body)
    }
    catch(error){
        console.log(error.message)
        next(error);
    }
}
function isExpired(dateString: string) {

    const currentDate = dayjs();
    const expirationDate = dayjs(dateString, "YYYY-MM-DDTHH:mm:ss.SSSZ");
    return expirationDate.isBefore(currentDate);
  }

async function createPaymentToBasic(res: Response, userId: number, next: NextFunction) {
    let paymentFound = false;
    const user = await sellerRepository.findByUserId(userId)

    
    const logPaymentUser = await sellerRepository.logsPayment(userId)
    for (const log of logPaymentUser) {
        console.log(log.status_payment);
        const dateString = log.date_of_expiration;  
        console.log(isExpired(dateString))      

        if (logPaymentUser.length === 1 && log.status_payment === "pending" && isExpired(dateString) === false) {
          paymentFound = true;
          await searchPayment(res, log.payment_id, next);
          break; 
        }
    }

    const planBasic = await planRepository.findPlanBasic()

    if(!userId) throw unauthorizedError()
    if(!user) throw notFoundError()
    if(user.plan_id === planBasic.id) throw notModifiedError()
    
    const body = {
        plan_id:planBasic.id,
        name_plan: planBasic.name,
        name_user:user.name,
        value: planBasic.price,
        email: user.email,
        cpf: user.cpf
    }
    try{
        if (!paymentFound) {
            await mercadoPago.paymentPix(res, body, userId, next)
        }
    }
    catch(error){
        console.log(error.message)
        next(error);
    }
}


async function createPaymentToPremium(res: Response, userId: number, next: NextFunction) {
    const user = await sellerRepository.findByUserId(userId)
    if(!userId) throw unauthorizedError()
    if(!user) throw notFoundError()
    const planPremium = await planRepository.findPlanPremium()

    const body = {
        plan_id:planPremium.id,
        name_plan: planPremium.name,
        name_user:user.name,
        value: planPremium.price,
        email: user.email,
        cpf: user.cpf
    }

    try{
        const payment = await mercadoPago.paymentPix(res, body, userId, next)
        return payment
    }
    catch(error){
        console.log(error.message)
        next(error);
    }
}
async function createPaymentToMasterRaffle(res: Response, userId: number, next: NextFunction) {
    const user = await sellerRepository.findByUserId(userId)
    if(!userId) throw unauthorizedError()
    if(!user) throw notFoundError()
    const planMaster = await planRepository.findPlanMegaRifa()

    const body = {
        plan_id:planMaster.id,
        name_plan: planMaster.name,
        name_user:user.name,
        value: planMaster.price,
        email: user.email,
        cpf: user.cpf
    }

    try{
        const payment = await mercadoPago.paymentPix(res, body, userId, next)
        return payment
    }
    catch(error){
        console.log(error.message)
        next(error);
    }
}
const planService = {
    createPaymentToBasic,
    createPaymentToPremium,
    createPaymentToMasterRaffle
}
export default planService