import { AuthenticatedRequest } from "@/middlewares";
import planService from "@/services/plans-service";
import webHookService from "@/services/webhook-service";
import { NextFunction, Request, Response } from "express";

export async function webhook(req: AuthenticatedRequest, res: Response, next: NextFunction){
    try{
        const notification = req.body;
        const payment = await webHookService.findPurchase(notification.data.id, next)
        const status_payment = payment.body.status
        console.log(status_payment)
        // if(status_payment === "approved"){
        //     return await planService.updatePlanToBasic(req, status_payment)
        // }
        return res.sendStatus(200);
    }catch(error){
        console.log(error.message)
        next(error)
    }
}
