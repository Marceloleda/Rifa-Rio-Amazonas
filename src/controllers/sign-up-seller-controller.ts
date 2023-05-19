import { AuthenticatedRequest } from "@/middlewares";
import { SignUp } from "@/protocols";
import signUpService from "@/services/sign-up-seller-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function createSignUpSeller(req: AuthenticatedRequest, res: Response){
    const data = req.body as SignUp
    try{
        await signUpService.signUpCreate(res, data);
        return res.sendStatus(httpStatus.CREATED);
    }catch(error){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR);
    }
}