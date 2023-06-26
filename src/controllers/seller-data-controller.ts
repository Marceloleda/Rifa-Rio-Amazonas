import { AuthenticatedRequest } from "@/middlewares";
import sellerService from "@/services/selller-service";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";

export async function searchSellerData(req: AuthenticatedRequest, res: Response, next: NextFunction){
    const {userId} = req
    try{
        const seller = await sellerService.findSellerData(userId);
        return res.status(httpStatus.OK).send(seller);
    }catch(error){
        next(error)
    }
}