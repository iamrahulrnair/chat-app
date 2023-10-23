'use client';

import { GeneralContext } from '@/context/generalContext';
import React, { useEffect } from 'react';
import { FC } from 'react';
import { useSession } from 'next-auth/react';
import { FriendsList } from '@/components';

interface pageProps {
  children: React.ReactNode;
}

const page: FC<pageProps> = ({ children }) => {
  const { setSearchedUsers, setFriends } = React.useContext(GeneralContext);
  const { status } = useSession();

  useEffect(() => {
    (async () => {
      try {
        if (status === 'authenticated') {
          const response = await fetch('/api/friend', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          setFriends(data);
        }
      } catch (err) {
        console.log(err);
        
      }
    })();
  }, [status]);

  const handleSearchUsername = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const username = e.target.value;
      const response = await fetch(`/api/users?username=${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setSearchedUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex mt-[70px]'>
      <div className='w-[25%] bg-slate-300 h-[calc(100vh-70px)] p-5'>
        <div className='flex items-center h-[100px] border-b-gray-200 border-b-2 p-4space-y-4 '>
          <input
            placeholder='Search <username>'
            onChange={handleSearchUsername}
            type='text'
            className='px-5'
          />
        </div>
        <div>
          <FriendsList />
        </div>
      </div>
      <div className='w-full'>{children}</div>
    </div>
  );
};

export default page;
