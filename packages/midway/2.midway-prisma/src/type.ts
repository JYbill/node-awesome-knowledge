import { Prisma } from '@prisma/client';

/**
 * prisma 类型
 */
export const userData = Prisma.validator<Prisma.UserArgs>()({});
const userWithEmailData = Prisma.validator<Prisma.UserArgs>()({
  include: { emails: true, roles: true },
});
export type UserWithPosts = Prisma.UserGetPayload<typeof userWithEmailData>;
export type UserData = Prisma.UserGetPayload<typeof userData>;
