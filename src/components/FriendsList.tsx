'use client';

import { GeneralContext } from '@/context/generalContext';
import React, { useContext } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export function FriendsList() {
  const { friends, setChatUser, chatUser } = useContext(GeneralContext);
  const { status } = useSession();

  if (status == 'loading') {
    return <div>Loading...</div>;
  }
  if (friends?.length == 0) {
    return (
      <div className='text-center mt-[100px]'>
        <p className='text-2xl'>You have 0 connections.</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col space-y-4'>
      {friends?.map(({ follower }) => {
        return (
          <React.Fragment key={follower.id}>
            <div
              onClick={() => setChatUser(follower)}
              className={`flex space-y-4 space-x-4 mt-4 mx-2 rounded-10 cursor-pointer hover:bg-slate-200 p-4 ${
                chatUser?.id == follower.id ? 'bg-slate-200' : ''
              }`}
            >
              <div>
                <Image
                  src={follower.image}
                  className='rounded-full'
                  alt={follower.username}
                  width={50}
                  height={50}
                />
              </div>
              <div>{follower.username}</div>
            </div>
            <hr />
          </React.Fragment>
        );
      })}
    </div>
  );
}
