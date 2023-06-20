import mercadoPago from "@/controllers/mercado-pago-controller";
import { conflictError, notFoundError, notModifiedError, unauthorizedError } from "@/errors";
import planRepository from "@/repositories/plans-repository";
import sellerRepository from "@/repositories/sellers-repository";
import dayjs from "dayjs";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";

async function searchPayment(res: Response, payment_id: string) {
    var mercadopago = require('mercadopago');
    mercadopago.configurations.setAccessToken(process.env.TOKEN_MERCADOPAGO_PRODUCTION);
    const searchResult = await mercadopago.payment.get(payment_id);
    return searchResult.body
}

function isExpired(dateString: string) {
    const currentDate = dayjs();
    const expirationDate = dayjs(dateString, "YYYY-MM-DDTHH:mm:ss.SSSZ");
    return expirationDate.isBefore(currentDate);
}

async function createPaymentToBasic(res: Response, userId: number, next: NextFunction) {
    let paymentFound = false;
    const user = await sellerRepository.findByUserId(userId)
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
    const logPaymentUser = await sellerRepository.logsPayment(userId)
    const lastPayment = logPaymentUser[logPaymentUser.length - 1];
    console.log(lastPayment)
    const dateString = lastPayment.date_of_expiration;  

    try{
        if(lastPayment.status_payment === "pending" && isExpired(dateString) === false && lastPayment.plan_id === planBasic.id) {
            paymentFound = true;
            console.log("search plan")
            const paymentPlan = await searchPayment(res, lastPayment.payment_id);
            return paymentPlan
        }
        if (!paymentFound) {
            const payment = await mercadoPago.paymentPix(res, body, userId, next)
            return payment
        }
    }
    catch(error){
        console.log(error.message)
        next(error);
    }
}

async function createPaymentToPremium(res: Response, userId: number, next: NextFunction) {
    let paymentFound = false;
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

    const logPaymentUser = await sellerRepository.logsPayment(userId)
    const lastPayment = logPaymentUser[logPaymentUser.length - 1];
    console.log(lastPayment)
    const dateString = lastPayment.date_of_expiration;  

    try{
        if(lastPayment.status_payment === "pending" && isExpired(dateString) === false && lastPayment.plan_id === planPremium.id) {
            paymentFound = true;
            console.log("search plan")
            const paymentPlan = await searchPayment(res, lastPayment.payment_id);
            return paymentPlan
        }
    
        if (!paymentFound){
            const payment = await mercadoPago.paymentPix(res, body, userId, next)
            return payment
        }
    }
    catch(error){
        console.log(error.message)
        next(error);
    }
}
async function createPaymentToMasterRaffle(res: Response, userId: number, next: NextFunction) {
    let paymentFound = false;

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

    const logPaymentUser = await sellerRepository.logsPayment(userId)
    const lastPayment = logPaymentUser[logPaymentUser.length - 1];
    console.log(lastPayment)
    const dateString = lastPayment.date_of_expiration;  

    try{
        if(lastPayment.status_payment === "pending" && isExpired(dateString) === false && lastPayment.plan_id === planMaster.id) {
            paymentFound = true;
            console.log("search plan")
            const paymentPlan = await searchPayment(res, lastPayment.payment_id);
            return paymentPlan
        }

        if (!paymentFound){
            const payment = await mercadoPago.paymentPix(res, body, userId, next)
            return payment
        }
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