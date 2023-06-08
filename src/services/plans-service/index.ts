import mercadoPagoMiddleware from "@/middlewares/mercado-pago-middleware";
import { Response } from "express";
import httpStatus from "http-status";

async function updatePlanToBasic(res: Response) {
    const body = {
        plan: "Basico",
        value: 29.90
    }
    try{
        const payment = await mercadoPagoMiddleware.payment(res)
        console.log("cria pagamento para plano basico")
        return payment
    }
    catch(error){
        console.log(error.message)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

async function updatePlanToPremium(res: Response) {
    const body = {
        plan: "Premium",
        value: 79.90
    }
    try{
        const payment = await mercadoPagoMiddleware.payment(res)
        console.log("cria pagamento para plano premium")
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