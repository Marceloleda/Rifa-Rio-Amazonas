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


const rafflesRepository = {
    createRaffles,
    findSellerAndRafflesByUserId,
    findRaffle
}
export default rafflesRepository;