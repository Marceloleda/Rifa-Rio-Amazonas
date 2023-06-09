import { forbiddenError, notFoundError, notModifiedError, unauthorizedError } from "@/errors";
import { AuthenticatedRequest } from "@/middlewares";
import mercadoPagoMiddleware from "@/middlewares/mercado-pago-middleware";
import sellerRepository from "@/repositories/sellers-repository";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";

async function createPaymentToBasic(res: Response, userId: number, next: NextFunction) {

    const user = await sellerRepository.findByUserId(userId)
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
    try{
        await mercadoPagoMiddleware.paymentPix(res, body)
    }
    catch(error){
        console.log(error.message)
        next(error);
    }
}

// async function updatePlanToBasic(status:string) {
//     console.log("function updatePlanToBasic", status)

//     if(!status) throw notFoundError()

//     const user = await sellerRepository.findByUserId(userId)
//     const userUpdate ={
//         ...user, plan: "Basico"
//     }
    
//     // return await sellerRepository.updatePlan(userUpdate, userId)

// }

async function createPaymentToPremium(res: Response, userId: number) {
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
        const payment = await mercadoPagoMiddleware.paymentPix(res, body)
        return payment
    }
    catch(error){
        console.log(error.message)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

const planService = {
    createPaymentToBasic,
    createPaymentToPremium,
    updatePlanToBasic
}
export default planService