import mercadoPago from "@/controllers/mercado-pago-controller";
import { notFoundError, notModifiedError, unauthorizedError } from "@/errors";
import sellerRepository from "@/repositories/sellers-repository";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";

async function createPaymentToBasic(res: Response, userId: number, next: NextFunction) {

    const user = await sellerRepository.findByUserId(userId)
    const quantityPlanUser = await sellerRepository.quantityPlan(userId)
    console.log(quantityPlanUser.map((pay)=>{
        pay.status_payment
    }))
    if(!userId) throw unauthorizedError()
    if(!user) throw notFoundError()
    if(user.plan === "Basico") throw notModifiedError()
    
    const body = {
        name_plan: "Basico",
        name_user:user.name,
        value: 0.10,
        email: user.email,
        cpf: user.cpf
    }
    console.log(body)
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
    console.log(userId)
    if(!userId) throw unauthorizedError()
    if(!user) throw notFoundError()

    const body = {
        name_plan: "Premium",
        name_user:user.name,
        value: 79.90,
        email: user.email,
        cpf: user.cpf
    }

    try{
        const payment = await mercadoPago.paymentPix(res, body, userId, next)
        return payment
    }
    catch(error){
        console.log(error.message)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

const planService = {
    createPaymentToBasic,
    createPaymentToPremium
}
export default planService