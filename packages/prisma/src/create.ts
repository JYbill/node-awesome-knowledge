/**
 * @file: create.ts
 * @author: xiaoqinvar
 * @desc：prisma 新增
 * @date: 2022-07-30 11:35:52
 */
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({
  log: ['query', 'info'],
});

async function main() {
  await prisma.$connect();
  const createRet = await prisma.user.create({
    data: {
      name: 'xiaoqinvar',
      email: 'xiaoqinvar@google.com',
      posts: {
        create: { title: 'Join us for Prisma Day 2020' },
      },
    },
  });
  console.log('新增结果', createRet);
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
}

main()
  .catch((e) => {
    console.log(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
