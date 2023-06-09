import { notFoundError } from "@/errors";
import { AuthenticatedRequest } from "@/middlewares";
import { webhook_notfication } from "@/protocols";
import webHookService from "@/services/webhook-service";
import { NextFunction, Response } from "express";

export async function webhook(req: AuthenticatedRequest, res: Response, next: NextFunction){
    const {userId} = req
    const notification: webhook_notfication = req.body;
    try{
        if(!notification) throw notFoundError()
        console.log(notification)

        // await webHookService.findPurchase(notification.data.id, next)

        // await webHookService.updatePlan(userId, purchase) altera o plano 
        return res.sendStatus(200);
    }catch(error){
        console.log(error.message)
        next(error)
    }
}