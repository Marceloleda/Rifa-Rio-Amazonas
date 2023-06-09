import { AuthenticatedRequest } from "@/middlewares";
import sellerRepository from "@/repositories/sellers-repository";
import webHookService from "@/services/webhook-service";
import { NextFunction, Request, Response } from "express";

export async function webhook(req: Request, res: Response, next: NextFunction) {
  
    try {
      const notification = req.body;
      const payment = await webHookService.findPurchase( notification.data.id, next);
      const status_payment = payment?.body?.status;
      console.log(status_payment);
  
      return res.sendStatus(200);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }
