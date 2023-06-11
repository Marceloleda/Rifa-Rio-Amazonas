import webHookService from "@/services/webhook-service";
import { NextFunction, Request, Response } from "express";

export async function webhook(req: Request, res: Response, next: NextFunction) {
  
    try {
      const notification = req.body;
      const test = await webHookService.findPurchase(notification.data.id, next);
      console.log(test)
      return res.sendStatus(200);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
}

export async function updatePlan(req:Request, res: Response, next: NextFunction) {
  
  try {
    const notification = req.body;
    console.log("teste da notification", notification)
    return res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
}