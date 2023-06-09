import { AuthenticatedRequest } from "@/middlewares";
import planService from "@/services/plans-service";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export async function basicPlan(req: AuthenticatedRequest, res: Response, next:NextFunction){
    const {userId} = req
    try{
        const paymentCreated = await planService.updatePlanToBasic(res, userId);
        return res.status(httpStatus.OK).send(paymentCreated);
    }catch(error){
        console.log(error.message)
        next(error)
    }
}
export async function premiumPlan(req: AuthenticatedRequest, res: Response, next:NextFunction){
    const {userId} = req
    console.log(req.body)
    try{
        console.log(req.body)

        // const paymentCreated = await planService.updatePlanToPremium(res, userId);
        return res.status(httpStatus.OK).send(req.body);
    }catch(error){
        console.log(error.message)
        next(error)
    }
}