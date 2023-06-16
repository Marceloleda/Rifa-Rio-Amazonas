import { forbiddenError, notFoundError, unauthorizedError } from "@/errors";
import { createRaffle } from "@/protocols";
import planRepository from "@/repositories/plans-repository";
import rafflesRepository from "@/repositories/raffles-repository";
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
    if(!userId) throw unauthorizedError()
      
    const decimal: Decimal = new Decimal(data.ticket_price)

    if(!isDecimalNumber(decimal)){
        return res.status(httpStatus.BAD_REQUEST).send("Price must be a decimal")
    }

    const sellers: Omit<sellers,'password_hash' | 'updated_at'> & { raffles: raffles[];} = 
    await rafflesRepository.findSellerAndRafflesByUserId(userId)

    console.log(sellers)
    if(!sellers) throw notFoundError();

    const test = sellers.raffles.map((value)=>{
        return value.total_tickets
    })
    console.log(test)
    const planBasic = await planRepository.findPlanBasic()

    
    if(sellers.plan_id === planBasic.id){
        
        // const isDayExpired = (date: string) => dayjs().date() === dayjs(date).date() ? 
        // false : dayjs().isAfter(dayjs(date));  implementar isso na funcao onde desativa a campanha NA HORA DE BUSCAR AS CAMPANHAS
        
        const expireAt = date.add(planBasic.campaign_duration, 'day').format('DD-MM-YYYY hh:mm');

        const raffleData = {
            ...data,
            seller_id: userId,
            available_tickets: data.total_tickets,
            expire_at: expireAt
        };

        if(!raffleData) throw notFoundError();

        if(sellers.raffles.length >= planBasic.max_campaigns){
            throw forbiddenError("You need to change plans to perform this action (raffles length).")
        }
        if(raffleData.total_tickets > planBasic.max_tickets){
            throw forbiddenError("You need to change plans to perform this action (tickets).")
        }

        const raffleCreated = await rafflesRepository.createRaffles(raffleData)
    
        return raffleCreated 
    }

    if(sellers.plan_id === 2){
        
        // const isDayExpired = (date: string) => dayjs().date() === dayjs(date).date() ? 
        // false : dayjs().isAfter(dayjs(date));  implementar isso na funcao onde desativa a campanha NA HORA DE BUSCAR AS CAMPANHAS
        
        const expireAt = date.add(70, 'day').format('DD-MM-YYYY hh:mm');

        const raffleData = {
            ...data,
            seller_id: userId,
            available_tickets: data.total_tickets,
            expire_at: expireAt
        };

        if(!raffleData) throw notFoundError();

        if(sellers.raffles.length >=3){
            throw forbiddenError("You need to change plans to perform this action (raffles length).")
        }
        if(raffleData.total_tickets > 1000){
            throw forbiddenError("You need to change plans to perform this action (tickets).")
        }
       

        const raffleCreated = await rafflesRepository.createRaffles(raffleData)
    
        return raffleCreated 
    }

}


const raffleService = {
    raffleCreate,
};
export default raffleService;