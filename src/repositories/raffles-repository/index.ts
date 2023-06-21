import { prisma } from "@/config";
import { createRaffle } from "@/protocols";

async function createRaffles(data: createRaffle){
    return await prisma.raffles.create({
        data
    })
}

async function findSellerAndRafflesByUserId(id:number) {
    return await prisma.sellers.findUnique({
        where: {
            id
          },
          include: {
            raffles: true
          }
    })
}

async function findRaffle(id:number) {
    return await prisma.raffles.findUnique({
        where: {id}
    })
}

async function updateTotalTickets(id:number, balance: number) {
    return await prisma.sellers.update({
        where: {id},
        data:{
            total_ticket_plan: balance
        }
    })
}


const rafflesRepository = {
    createRaffles,
    findSellerAndRafflesByUserId,
    findRaffle,
    updateTotalTickets
}
export default rafflesRepository;