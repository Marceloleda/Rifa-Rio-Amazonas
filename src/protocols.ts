import { raffles, sellers } from "@prisma/client";

export type ApplicationError = {
    name: string;
    message: string;
};


export type GetUserOrFailResult = Pick<sellers, 'id' | 'email' | 'password_hash'>;
export type SignUp = Omit<sellers,  'created_at' | 'updated_at'>; 
export type createRaffle = Omit<raffles, 'updated_at'>

export type payment_body = {
    name_plan: string,
    name_user:string,
    value: number,
    email: string,
    cpf: string
}