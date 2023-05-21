import { createRaffle } from "@/protocols";
import rafflesRepository from "@/repositories/raffles-repository";
import sellerRepository from "@/repositories/sellers-repository";
import { exclude } from "@/utils/prisma-utils";
import { raffles, sellers } from "@prisma/client";
import { Response } from "express";
import httpStatus from "http-status";


async function raffleCreate(res: Response, data:createRaffle, userId: number) { 
    if(!userId){
        return res.sendStatus(httpStatus.UNAUTHORIZED)
    }  
    const raffles: Omit<sellers,'password_hash' |'created_at' | 'updated_at'> & { raffles: raffles[];} = 
    await rafflesRepository.findRafflesByUserId(userId)
    console.log(raffles)
  
    if(raffles.plan === "Teste"){
        if(raffles.raffles.length >=1){
            return res.status(httpStatus.FORBIDDEN).send({message: "You need to change plans to perform this action."})
        }

    }


    const raffle = {
        ...data,
        seller_id: userId,
        available_tickets: data.total_tickets,
    };
    console.log(raffle)
    const raffleCreated = await rafflesRepository.createRaffles(raffle)

    return raffleCreated 
}

const raffleService = {
    raffleCreate,
};
export default raffleService;