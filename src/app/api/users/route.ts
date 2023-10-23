import { authOptions } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { prisma } from '@/lib/auth';

async function isfriends(user1: User, user2: any) {
  const res = await prisma.connections.findUnique({
    where: {
      followerId_followeeId: {
        followerId: user1.id,
        followeeId: user2.id,
      },
    },
  });
  return res !== null;
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const username = searchParams.get('username');
    const session = await getServerSession(authOptions);
    if (!session)
      return new Response('Not authorized', {
        status: 401,
      });

    const response = await prisma.user.findMany({
      where: {
        username: {
          contains: username || ' ',
        },
      },
      orderBy: {
        username: 'asc',
      },
    });

    let filtered_response = await response.filter((user) => {
      return user.id !== session.user.id;
    });
    // Filtering out if friends with the current user.
    // async doesnt work on filter, so promise.all is used
    // to resolve first and filter out.

    filtered_response = await Promise.all(
      filtered_response.map(async (user) => {
        return {
          ...user,
          isFriend: await isfriends(user, session.user),
        };
      })
    );
    filtered_response = filtered_response.filter((user: any) => {
      return user.isFriend !== true;
    });
    return new NextResponse(JSON.stringify(filtered_response), {
      status: 200,
    });
  } catch (err) {}
}
