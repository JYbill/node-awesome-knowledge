/**
 * @file: update.ts
 * @author: xiaoqinvar
 * @desc：prisma 更新
 * @date: 2022-07-30 11:35:40
 */
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();
  const updateRet = await prisma.user.update({
    where: {
      id: '62e79174229f743f8f1d0a85',
    },
    data: { age: 10, name: 'gua.' },
  });
  console.log(updateRet);
}

main()
  .catch((e) => {
    console.log(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
