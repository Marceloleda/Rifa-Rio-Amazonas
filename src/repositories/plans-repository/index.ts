import { prisma } from "@/config";
import { plans } from "@prisma/client";

async function findPlanTest() {
    return await prisma.plans.findUnique({
        where:{name: 'Plano Teste'}
    })
}

async function findPlanBasic() {
    return await prisma.plans.findUnique({
        where:{name: 'Plano Básico'}
    })
}
async function findPlanPremium() {
    return await prisma.plans.findUnique({
        where:{name: 'Plano Premium'}
    })
}
async function findPlanMegaRifa() {
    return await prisma.plans.findUnique({
        where:{name: 'Plano Mega Rifa'}
    })
}
async function findAllPlans(): Promise<any> {
    return await prisma.plans.findMany()
}
async function findPlanById(userPlan: any) {
    return await prisma.plans.findUnique({
        where:{id:userPlan.plan_id}
    })
}
const planRepository = {
    findPlanBasic,
    findPlanPremium,
    findPlanMegaRifa,
    findPlanTest,
    findAllPlans,
    findPlanById
}

export default planRepository;