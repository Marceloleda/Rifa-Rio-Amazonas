import { AuthenticatedRequest } from "@/middlewares";
import sellerRepository from "@/repositories/sellers-repository";
import webHookService from "@/services/webhook-service";
import { NextFunction, Request, Response } from "express";

export async function webhook(req: Request, res: Response, next: NextFunction) {
  
    try {
      const notification = req.body;
      const test = await webHookService.findPurchase(res, notification.data.id, next);
      console.log(test)
      return res.status(200).send(test);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }
