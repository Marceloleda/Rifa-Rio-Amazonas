import { NextFunction, Request, Response } from "express"
import httpStatus from "http-status";

export async function buyTicket(req:Request, res: Response, next: NextFunction){
    const {id, quantity, total}: {id:string, quantity: number, total: number} =req.body;
    try{
        // const paymentCreated = await buyerService.createPaymentToTicket(id, quantity, total);
        return res.status(httpStatus.OK).send("ok");
    }
    catch(error){
        console.log(error.message)
        next(error)
    }
}