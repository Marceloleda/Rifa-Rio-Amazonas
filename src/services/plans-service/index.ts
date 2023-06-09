import { notFoundError, unauthorizedError } from "@/errors";
import mercadoPagoMiddleware from "@/middlewares/mercado-pago-middleware";
import sellerRepository from "@/repositories/sellers-repository";
import { Response } from "express";
import httpStatus from "http-status";

async function updatePlanToBasic(res: Response, userId: number) {

    const user = await sellerRepository.findByUserId(userId)
    if(!userId) throw unauthorizedError()
    if(!user) throw notFoundError()
    
    const body = {
        name_plan: "Basico",
        name_user:user.name,
        value: 0.10,
        email: user.email,
        cpf: user.cpf
    }
    try{
        return await mercadoPagoMiddleware.paymentPix(res, body)
    }
    catch(error){
        console.log(error.message)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

async function updatePlanToPremium(res: Response, userId: number) {
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
    updatePlanToBasic,
    updatePlanToPremium
}
export default planService