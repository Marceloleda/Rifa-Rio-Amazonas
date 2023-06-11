import { prisma } from "@/config";

async function findByIdPurchase(paymentId: any){
    return prisma.payments_plan.findUnique({
        where: {
            payment_id: paymentId
        }
    })
}
async function updateByIdPayment(payment: any){
    return prisma.sellers.update({
        where: {id: payment.seller_id},
        data: {
            plan: payment.description
        }
    })
}
const webhookRepository = {
    findByIdPurchase,
    updateByIdPayment
}

export default webhookRepository;