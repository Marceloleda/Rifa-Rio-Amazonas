import { prisma } from "@/config";
import { plans } from "@prisma/client";

async function findByIdPurchase(paymentId: string){
    return prisma.payments_plan.findUnique({
        where: {
            payment_id: paymentId
        }
    })
}
async function updatePlanByIdPayment(payment: any, plan: plans){
    return prisma.sellers.update({
        where: {id: payment.seller_id},
        data: {
            plan_id: payment.plan_id,
            total_ticket_plan: plan.max_tickets
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
            status_payment: "cancelled"
        }
    })
}
const webhookRepository = {
    findByIdPurchase,
    updatePlanByIdPayment,
    updateByIdStatus,
    updateByIdStatusCanceled
}

export default webhookRepository;