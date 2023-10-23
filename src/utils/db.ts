import { prisma } from '@/lib/auth';

export const userExists = async (id: string): Promise<boolean> => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return user !== null;
};
