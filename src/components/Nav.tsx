import React from 'react';
import { getServerSession } from 'next-auth';
import { FC } from 'react';
import { authOptions } from '@/lib/auth';
import Image from 'next/image';
import Link from 'next/link';
interface pageProps {}

export const Nav: FC<pageProps> = async ({}) => {
  const session = await getServerSession(authOptions);

  return (
    <nav className='h-[70px] p-4 flex justify-between items-center shadow-[0px_20px_26px_0px_#00000024] fixed top-0 left-0 w-full bg-gray-50'>
      <div>
        <h1 className='text-5xl'>Chat app</h1>
      </div>
      {session && (
        <div className='flex items-center space-x-5'>
          <p>
            Hey,
            <span className='text-3xl mx-2'>{session.user.username}</span>
          </p>

          <Image
            src={session.user.image!}
            alt={session.user.username}
            width={50}
            height={50}
            className='rounded-full'
          />
        </div>
      )}
      <ul className='flex space-x-3 text-2xl '>
        {session && (
          <>
            <li>Home</li>
            <li>Chats</li>
            <li>Profile</li>
            <li>Archive</li>
          </>
        )}

        {session && <Link href={'/auth/logout'}>logout</Link>}
      </ul>
    </nav>
  );
};
