import { AuthenticatedRequest } from "@/middlewares";
import sellerRepository from "@/repositories/sellers-repository";
import webHookService from "@/services/webhook-service";
import { NextFunction, Request, Response } from "express";

export async function webhook(req: Request, res: Response, next: NextFunction) {
  
    try {
      const notification = req.body;
      await webHookService.findPurchase(res, notification.data.id, next);
  
      return res.sendStatus(200);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }
