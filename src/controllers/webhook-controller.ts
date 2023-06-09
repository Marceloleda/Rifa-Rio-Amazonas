import { AuthenticatedRequest } from "@/middlewares";
import { webhook_notfication } from "@/protocols";
import { NextFunction, Response } from "express";

export async function webhook(req: AuthenticatedRequest, res: Response, next: NextFunction){
    const {userId} = req
    const notification: webhook_notfication = req.body;
    try{
        console.log('Notificação do Mercado Pago recebida:', notification);
        console.log(notification.data)

        // await webHookService.updatePlan(userId, purchase) altera o plano 
        return res.sendStatus(200);
    }catch(error){
        next(error)
    }
}