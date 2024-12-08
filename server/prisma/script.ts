import {PrismaClient, User} from '@prisma/client'
import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from 'uuid';
const prisma = new PrismaClient()

async function main() {
  // const user = await prisma.user.create({
  //   data: {
  //     username: 'Alice',
  //     email: 'alice@prisma.io',
  //   },
  // })
  // console.log(user)
  prisma.user.deleteMany();
  seed();
}

async function seed() {
  const amountOfUsers = 10;
  const users: User[] = [];

  for (let i = 0; i < amountOfUsers; i++) {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()

    const user: User = {
      id: uuidv4(),
      email: faker.internet.email({firstName, lastName}),
      username: faker.person.firstName() + faker.number.int(100),
    };

    users.push(user);
  }

  const addUsers = async () => await prisma.user.createMany({ data: users });

  addUsers();
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })