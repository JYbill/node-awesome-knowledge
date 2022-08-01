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
      name: '小青蛙',
      age: 18,
      emails: {
        create: {
          qqMail: '123456@qq.com',
          googleMail: '12345@gmail.com',
        },
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
