import { AuthenticatedRequest } from "@/middlewares";
import webHookService from "@/services/webhook-service";
import { NextFunction, Request, Response } from "express";

export async function webhook(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;
  
    try {
    console.log("verifica o userId", userId)

      const notification = req.body;
      const payment = await webHookService.findPurchase(userId, notification.data.id, next);
      const status_payment = payment?.body?.status;
      console.log(status_payment);
  
      return res.sendStatus(200);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }
