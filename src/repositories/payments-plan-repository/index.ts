import { prisma } from "@/config";

async function create(payment:any, id: number) {
    return await prisma.payments_plan.create({
        data: {
            seller_id: id,
            payment_id: payment.id,
            status_payment: payment.status,
            description: payment.description
        }

    })
}
const mercadoPagoRepository = {
    create
}

export default mercadoPagoRepository;