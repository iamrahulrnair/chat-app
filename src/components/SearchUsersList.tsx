import React, { FC } from 'react';
import { Button } from '.';

export function SearchUsersList({user, handleChatWithUser}:{
    user: User,
    handleChatWithUser: (user: User) => void
}) {
  return (
    <div
      className=' min-h-[100px] flex justify-between items-center p-3 bg-slate-300 rounded-md m-2'
    >
      <div className='flex'>
        <img
          src={user.image}
          alt={user.username}
          className='w-20 h-20 rounded-full'
        />
        <div className='ml-3 flex justify-center flex-col leading-6'>
          <h3 className='text-3xl'>{user.username}</h3>
          <p>Joined: {new Date(user.createdAt).toDateString()}</p>
        </div>
      </div>
      <div className='flex'>
        <Button onClick={(e) => handleChatWithUser(user)}>Chat</Button>
        <Button>Block</Button>
      </div>
    </div>
  );
}
