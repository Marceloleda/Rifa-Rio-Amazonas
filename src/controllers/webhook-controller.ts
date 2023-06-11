import webHookService from "@/services/webhook-service";
import { NextFunction, Request, Response } from "express";

export async function webhook(req: Request, res: Response, next: NextFunction) {
  
    try {
      const notification = req.body;
      const payment_status = await webHookService.findPurchaseAndChangePlan(notification.data.id, next);
      console.log(payment_status)
      return res.sendStatus(200);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
}

