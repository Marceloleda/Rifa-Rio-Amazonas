import { prisma } from "@/config";

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
async function findAllPlans() {
    return await prisma.plans.findMany()
}
const planRepository = {
    findPlanBasic,
    findPlanPremium,
    findPlanMegaRifa,
    findAllPlans
}

export default planRepository;