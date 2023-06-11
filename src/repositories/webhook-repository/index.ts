import { prisma } from "@/config";

async function findByIdPurchase(paymentId: any){
    return prisma.payments_plan.findUnique({
        where: {
            payment_id: paymentId
        }
    })
}
const webhookRepository = {
    findByIdPurchase
}

export default webhookRepository;