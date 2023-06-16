import { prisma } from "@/config";

async function findPlanBasic() {
    return await prisma.plans.findUnique({
        where:{name: 'Plano Básico'}
    })
}
async function findAllPlans() {
    return await prisma.plans.findMany()
}
const planRepository = {
    findPlanBasic,
    findAllPlans
}

export default planRepository;