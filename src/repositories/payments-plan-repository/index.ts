import { prisma } from "@/config";

async function create(id_plan: number,payment:any, id: number) {
    const paymentId = payment.id;
  const paymentIdString = paymentId.toString();
//   const createDate = payment.date_created;
//   const createString = createDate.toString()
    return await prisma.payments_plan.create({
        data: {
            seller_id: id,
            payment_id: paymentIdString,
            status_payment: payment.status,
            plan_id: id_plan,
            name_plan: payment.description,
            created_at: payment.date_created,
            date_of_expiration: payment.date_of_expiration,
            updated_at: payment.date_last_updated
        }
    })
}
const mercadoPagoRepository = {
    create
}

export default mercadoPagoRepository;