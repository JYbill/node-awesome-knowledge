/**
 * @file: index.ts
 * @author: xiaoqinvar
 * @desc：prisma 查询
 * @date: 2022-07-30 11:34:58
 */
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();
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
