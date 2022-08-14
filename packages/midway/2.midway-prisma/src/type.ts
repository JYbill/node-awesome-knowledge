import { Prisma } from '@prisma/client';

/**
 * prisma 类型
 */
const user = Prisma.validator<Prisma.UserArgs>()({});
const userWithEmailData = Prisma.validator<Prisma.UserArgs>()({
  include: { emails: true, roles: true },
});
const role = Prisma.validator<Prisma.RoleArgs>()({});
const email = Prisma.validator<Prisma.EmailArgs>()({});
export type UserWithPosts = Prisma.UserGetPayload<typeof userWithEmailData>;
export type UserData = Prisma.UserGetPayload<typeof user>;
export type EmailData = Prisma.UserGetPayload<typeof email>;
export type RoleData = Prisma.UserGetPayload<typeof role>;
