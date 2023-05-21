import { AuthenticatedRequest } from "@/middlewares";
import { createRaffle } from "@/protocols";
import raffleService from "@/services/raffles-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function createRaffle(req: AuthenticatedRequest, res: Response){
    const data = req.body as createRaffle
    const {userId} = req
    try{
        await raffleService.raffleCreate(res, data, userId);
        return res.sendStatus(httpStatus.CREATED);
    }catch(error){
        console.log(error.message)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR);
    }
}