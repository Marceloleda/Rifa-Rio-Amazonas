import { AuthenticatedRequest } from "@/middlewares";
import sellerService from "@/services/selller-service";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";

export async function searchSellerData(req: AuthenticatedRequest, res: Response, next: NextFunction){
    const {userId} = req
    try{
        await sellerService.findSellerData(userId);
        return res.sendStatus(httpStatus.OK);
    }catch(error){
        next(error)
    }
}