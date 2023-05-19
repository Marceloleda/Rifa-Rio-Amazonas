import { notFoundError } from "@/errors"
import bcrypt from 'bcrypt';
import { SignUp } from "@/protocols"
import sellerRepository from "@/repositories/sellers-repository.ts"
import { Response } from "express"
import httpStatus from "http-status"

async function signUpCreate(res: Response, data:SignUp) {   
    await checkIfEmailOrCpfExists(res,data.email, data.cpf, data.phone_number);

    const hash = await hashPassword(data.password_hash);
    const data_with_hash = ({...data, password_hash: hash})

    const seller = await sellerRepository.createSignUp(data_with_hash)

    return seller 
}
async function checkIfEmailOrCpfExists(res: Response, email: string, cpf: string, phone: string) {
    const emailExist = await sellerRepository.findByEmail(email)
    const cpfExist = await sellerRepository.findByCPF(cpf)
    const phoneExist = await sellerRepository.findByPhone(phone)

    if(emailExist){
        return res.status(httpStatus.CONFLICT).send({
            message: "Already have an account registered with this Email"
        })
    }
    if(cpfExist){
        return res.status(httpStatus.CONFLICT).send({
            message: "Already have an account registered with this CPF"
        })
    }
    if(phoneExist){
        return res.status(httpStatus.CONFLICT).send({
            message: "Already have an account registered with this Phone"
        })
    }

    return emailExist;
}
async function hashPassword(password?: string): Promise<string> {
    if (!password) {
      throw notFoundError();
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

const signUpService = {
    signUpCreate,
};
export default signUpService;