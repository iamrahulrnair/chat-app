import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { userExists } from '@/utils/db';
import { prisma } from '@/lib/auth';
import { pusherServer } from '@/lib/pusher';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const session = await getServerSession(authOptions);
    if (!session)
      return new NextResponse('Not authorized', {
        status: 401,
      });
    const receiverId = searchParams.get('reciever')!;
    const senderId = session.user.id;

    if (!(await userExists(receiverId))) {
      return new NextResponse('Invalid recipient.', {
        status: 401,
      });
    }

    // chats can contain both sender and receiver messages, so querying both.
    const chatsBySender = await prisma.message.findMany({
      where: {
        senderId: senderId,
        receiverId: receiverId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    const chatsByReciever = await prisma.message.findMany({
      where: {
        senderId: receiverId,
        receiverId: senderId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    const response = [...chatsBySender, ...chatsByReciever].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
    return new NextResponse(JSON.stringify(response), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse("something went wrong", {
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return new NextResponse('Not authorized', {
      status: 401,
    });
  const body = await req.json();
  const senderId = session.user.id;
  const receiverId = body.receiverId;
  const text = body.text;

  if (!(await userExists(receiverId))) {
    return new NextResponse('Invalid recipient.', {
      status: 401,
    });
  }

  // notify client

  const message = await prisma.message.create({
    data: {
      text: text,
      senderId: senderId,
      receiverId: receiverId,
    },
  });

  await pusherServer.trigger(`private_${senderId}`, 'incoming-message', {
    message,
  });
  await pusherServer.trigger(`private_${receiverId}`, 'incoming-message', {
    message,
  });

  return new NextResponse(JSON.stringify(message), {
    status: 200,
  });
}
