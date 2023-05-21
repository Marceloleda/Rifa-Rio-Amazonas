import { prisma } from "@/config";
import { createRaffle } from "@/protocols";

async function createRaffles(data: createRaffle){
    return await prisma.raffles.create({
        data,
    })
}

async function findRafflesByUserId(id:number) {
    return await prisma.sellers.findUnique({
        where: {
            id
          },
          include: {
            raffles: true
          }
    })
}

const rafflesRepository = {
    createRaffles,
    findRafflesByUserId
}
export default rafflesRepository;