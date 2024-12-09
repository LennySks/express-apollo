import { Post, PrismaClient, User } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
  await userSeed();
  await userPosts();
}

async function userSeed() {
  const amountOfUsers = 25;
  const users: User[] = [];

  for (let i = 0; i < amountOfUsers; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    const user: Omit<User, "id"> = {
      email: faker.internet.email({ firstName, lastName }),
      username: faker.person.firstName() + faker.number.int(100),
    };

    users.push(user);
  }

  const addUsers = async () => await prisma.user.createMany({ data: users });

  addUsers();
}

async function userPosts() {
  const users = await prisma.user.findMany();
  const posts = [];

  for (const user of users) {
    const amountOfPosts = faker.number.int({ min: 0, max: 5 });
    for (let i = 0; i < amountOfPosts; i++) {
      const recentDate = faker.date.recent(); // Get a recent date
      const truncatedDate = new Date(
        recentDate.getFullYear(),
        recentDate.getMonth(),
        recentDate.getDate(),
        recentDate.getHours(),
        recentDate.getMinutes(),
      );

      const post: Omit<Post, "id"> = {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        authorId: user.id,
        addedAt: truncatedDate,
      };

      posts.push(post);
    }
  }

  const addPosts = async () => await prisma.post.createMany({ data: posts });

  addPosts();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
