import { createRaffle } from "@/protocols";
import rafflesRepository from "@/repositories/raffles-repository";
import sellerRepository from "@/repositories/sellers-repository";
import { exclude } from "@/utils/prisma-utils";
import { raffles, sellers } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import dayjs from "dayjs";
import { Response } from "express";
import httpStatus from "http-status";


function isDecimalNumber(value: any) {
    if(!isNaN(value)) {
        if(parseInt(value) != parseFloat(value)) {
                return true;
      }
    }   
    return false;
}

async function raffleCreate(res: Response, data:createRaffle, userId: number) { 
    const date = dayjs();
    if(!userId){
        return res.sendStatus(httpStatus.UNAUTHORIZED)
    }  
    const decimal: Decimal = new Decimal(data.ticket_price)
    console.log(isDecimalNumber(decimal))

    if(!isDecimalNumber(decimal)){
        return res.sendStatus(httpStatus.FORBIDDEN)
    }

    const sellers: Omit<sellers,'password_hash' | 'updated_at'> & { raffles: raffles[];} = 
    await rafflesRepository.findSellerAndRafflesByUserId(userId)

    if(!sellers){
        return res.sendStatus(httpStatus.NOT_FOUND)
    }  

    
    
    if(sellers.plan === "Teste"){
        
        // const isDayExpired = (date: string) => dayjs().date() === dayjs(date).date() ? 
        // false : dayjs().isAfter(dayjs(date));  implementar isso na funcao onde desativa a campanha
        
        const expireAt = date.add(60, 'day').format('DD-MM-YYYY hh:mm');

        const raffleData = {
            ...data,
            seller_id: userId,
            available_tickets: data.total_tickets,
            expire_at: expireAt
        };

        if(!raffleData){
            return res.sendStatus(httpStatus.NOT_FOUND)
        }  

        if(sellers.raffles.length >=1){
            return res.status(httpStatus.FORBIDDEN).send({message: "You need to change plans to perform this action (raffles length)."})
        }
        if(raffleData.total_tickets > 100){
            return res.status(httpStatus.FORBIDDEN).send({message: "You need to change plans to perform this action (tickets)."})
        }

        const raffleCreated = await rafflesRepository.createRaffles(raffleData)
    
        return raffleCreated 

    }
}


const raffleService = {
    raffleCreate,
};
export default raffleService;