import { Prisma, sellers } from '@prisma/client';
import {prisma} from '../src/config/database'
import { error } from 'console';
const faker = require('faker');

async function main() {
    type sellersParams = Pick<sellers, 'name' | 'email' | 'key_password' | "phone_number" | 'cpf'>;

    const data: sellersParams[] = [];
  
    for (let i = 0; i < 4; i++) {
      const name = faker.name.findName();
      const email = faker.internet.email();
      const key_password = faker.internet.password();
      const phone_number = faker.phone.phoneNumber();
      const cpf = faker.br.cpf();
  
      data.push({
        name,
        email,
        key_password,
        phone_number,
        cpf
      });
    }
  
    await prisma.sellers.createMany({
      data,
    });
  }
  main()
    .then(()=> {
        console.log("Dados mocados criados com sucesso!!!")
    })
    .catch(err => {
        console.log(error(err))
        process.exit(1)
    })
    .finally(async ()=> {
        await prisma.$disconnect();
    })