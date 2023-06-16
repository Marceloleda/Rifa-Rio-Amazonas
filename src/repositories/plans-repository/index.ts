import { prisma } from "@/config";

async function findPlanBasic() {
    return await prisma.plans.findUnique({
        where:{name: 'Plano Básico'}
    })
}
const planRepository = {
    findPlanBasic
}

export default planRepository;