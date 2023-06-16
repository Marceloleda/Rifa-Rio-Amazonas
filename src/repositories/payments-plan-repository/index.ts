import { prisma } from "@/config";

async function create(id_plan: number,payment:any, id: number) {
    const paymentId = payment.id;
  const paymentIdString = paymentId.toString();
    return await prisma.payments_plan.create({
        data: {
            seller_id: id,
            payment_id: paymentIdString,
            status_payment: payment.status,
            plan_id: id_plan,
            name_plan: payment.description
        }

    })
}
const mercadoPagoRepository = {
    create
}

export default mercadoPagoRepository;