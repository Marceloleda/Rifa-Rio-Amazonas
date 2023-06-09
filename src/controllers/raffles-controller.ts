import { AuthenticatedRequest } from "@/middlewares";
import { createRaffle } from "@/protocols";
import raffleService from "@/services/raffles-service";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";

export async function createRaffle(req: AuthenticatedRequest, res: Response, next: NextFunction){
    const data = req.body as createRaffle
    const {userId} = req
    try{
        await raffleService.raffleCreate(res, data, userId);
        return res.sendStatus(httpStatus.CREATED);
    }catch(error){
        next(error)
    }
}