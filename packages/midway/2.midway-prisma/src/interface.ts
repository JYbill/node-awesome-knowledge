import { Prisma } from '@prisma/client';

/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  uid: string;
}

export interface IGetUserResponse {
  success: boolean;
  message: string;
  data: IUserOptions;
}

/**
 * prisma 类型
 */
export const userData = Prisma.validator<Prisma.UserArgs>()({});
const userWithEmailData = Prisma.validator<Prisma.UserArgs>()({
  include: { emails: true },
});
export type UserWithPosts = Prisma.UserGetPayload<typeof userWithEmailData>;
export type UserData = Prisma.UserGetPayload<typeof userData>;
