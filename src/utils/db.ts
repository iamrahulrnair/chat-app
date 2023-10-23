import { PrismaClient } from '@prisma/client';

export const userExists = async (id: string): Promise<boolean> => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  console.log('user', user);

  return user !== null;
};
