import mercadoPago from "@/controllers/mercado-pago-controller";
import { notFoundError, notModifiedError, unauthorizedError } from "@/errors";
import planRepository from "@/repositories/plans-repository";
import sellerRepository from "@/repositories/sellers-repository";
import dayjs from "dayjs";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";

async function createPaymentToBasic(res: Response, userId: number, next: NextFunction) {
    const user = await sellerRepository.findByUserId(userId)
    // const quantityPlanUser = await sellerRepository.quantityPlan(userId)
    const planBasic = await planRepository.findPlanBasic()
    console.log(planBasic)
    // console.log(quantityPlanUser.map((pay)=>{
    //     pay.status_payment
    // }))
    if(!userId) throw unauthorizedError()
    if(!user) throw notFoundError()
    if(user.plan_id === 1) throw notModifiedError()
    
    const body = {
        plan_id:planBasic.id,
        name_plan: planBasic.name,
        name_user:user.name,
        value: planBasic.price,
        email: user.email,
        cpf: user.cpf
    }
    try{
        await mercadoPago.paymentPix(res, body, userId, next)
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
    const planBasic = await planRepository.findPlanBasic()

    const body = {
        plan_id:planBasic.id,
        name_plan: planBasic.name,
        name_user:user.name,
        value: planBasic.price,
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
    const planBasic = await planRepository.findPlanBasic()

    const body = {
        plan_id:planBasic.id,
        name_plan: planBasic.name,
        name_user:user.name,
        value: planBasic.price,
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