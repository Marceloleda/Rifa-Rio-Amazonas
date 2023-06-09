import { NextFunction, Request, Response } from "express";

export async function webhook(req: Request, res: Response, next: NextFunction){
    try{
        const notification = req.body;
        console.log('Notificação do Mercado Pago recebida:', notification.data.id);
        // const purchase = await webHookService.findPurchase(notification.data)
        // await webHookService.updatePlan()
        return res.sendStatus(200);
    }catch(error){
        console.log(error.message)
        next(error)
    }
}