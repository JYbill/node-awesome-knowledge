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
  const findByFilter = {
    where: {
      OR: [
        {
          name: {
            contains: '🐸',
          },
        },
      ],
    },
  };
  const findAll = {};
  const findOne2More = {
    include: { emails: true },
  };
  const allUsers = await prisma.user.findMany(findOne2More);
  for (const user of allUsers) {
    console.log(user);
  }
}

main()
  .catch((e) => {
    console.log(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
