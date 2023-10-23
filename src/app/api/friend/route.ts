import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { userExists } from '@/utils/db';

import { prisma } from '@/lib/auth';


export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return new NextResponse('Not authorized', {
        status: 401,
      });
    const response = await prisma.connections.findMany({
      where: {
        followeeId: session.user.id,
      },
      include: {
        follower: true,
      },
    });

    return new NextResponse(JSON.stringify(response), {
      status: 200,
    });
  } catch (err) {}
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return new NextResponse('Not authorized', {
      status: 401,
    });
  const body = await req.json();
  const follower = session.user.id;
  const followee = body.followee;

  if (!(await userExists(followee))) {
    return new NextResponse('Invalid recipient.', {
      status: 401,
    });
  }

  await prisma.connections.create({
    data: {
      followerId: follower,
      followeeId: followee,
    },
  });
  await prisma.connections.create({
    data: {
      followerId: followee,
      followeeId: follower,
    },
  });
  //   followers list of current user
  const response = await prisma.connections.findMany({
    where: {
      followeeId: session.user.id,
    },
    include: {
      follower: true,
    },
  });
  console.log({ response });

  return new NextResponse(JSON.stringify(response), {
    status: 200,
  });
}
