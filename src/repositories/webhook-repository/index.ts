import { prisma } from "@/config";

async function findByIdPurchase(paymentId: string){
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
async function updateByIdStatus(payment: any){
    return prisma.payments_plan.update({
        where: {payment_id: payment},
        data: {
            status_payment: "approved"
        }
    })
}
async function updateByIdStatusCanceled(payment: any){
    return prisma.payments_plan.update({
        where: {payment_id: payment},
        data: {
            status_payment: "canceled"
        }
    })
}
const webhookRepository = {
    findByIdPurchase,
    updateByIdPayment,
    updateByIdStatus,
    updateByIdStatusCanceled
}

export default webhookRepository;