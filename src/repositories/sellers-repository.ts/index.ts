import { prisma } from "@/config";
import { SignUp } from "@/protocols";

async function findByEmail(email: string){
    return prisma.sellers.findUnique({
        where:{email}
    })
}
async function findByCPF(cpf: string){
    return prisma.sellers.findUnique({
        where:{cpf}
    })
}
async function findByPhone(phone: string){
    return prisma.sellers.findUnique({
        where:{phone_number: phone}
    })
}

async function findByUserId(id: number){
    return await prisma.sellers.findUnique({
        where: {id}
    })
}

async function createSignUp(data: SignUp){
    return prisma.sellers.create({
        data,
    })
}
const sellerRepository = {
    findByEmail,
    findByUserId,
    createSignUp,
    findByCPF,
    findByPhone
}

export default sellerRepository;