'use client';
import React, { useContext, useEffect, useTransition } from 'react';
import { FC } from 'react';
import { GeneralContext } from '@/context/generalContext';
import { SearchUsersList, Chats } from '@/components';
import { toast } from 'react-toastify';

const dummyUsers = [
  {
    createdAt: '2023-10-21T13:35:37.384Z',
    email: null,
    emailVerified: null,
    id: 'c95fb7be-5dc5-443f-ac07-e57bb68a10f8',
    image: 'https://avatars.githubusercontent.com/u/55646183?v=4',
    name: null,
    updatedAt: '2023-10-21T13:35:37.384Z',
    username: 'thecoderahul',
  },
  {
    createdAt: '2023-10-21T13:35:37.384Z',
    email: null,
    emailVerified: null,
    id: 'c95fb7be-5dc5-443f-ac07-e57bb68a10f8',
    image: 'https://avatars.githubusercontent.com/u/55646183?v=4',
    name: null,
    updatedAt: '2023-10-21T13:35:37.384Z',
    username: 'thecoderahul',
  },
];

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const { searchedUsers, chatUser, setChatUser, setSearchedUsers,setFriends } =
    useContext(GeneralContext);

  const handleChatWithUser = async (user: User) => {
    try {
      
      const response = await fetch('/api/friend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ followee: user.id }),
      }); // create connection
      const data = await response.json();
      setFriends(data)
      setChatUser(user);
      setSearchedUsers([]);
      toast.success('Connection successful.');
    } catch (err) {
      toast.error('Connection failed.');
      console.log(err);
    }
  };

  if (searchedUsers.length > 0) {
    return (
      <>
        {searchedUsers.map((user: User) => (
          <SearchUsersList
            key={user.id}
            user={user}
            handleChatWithUser={handleChatWithUser}
          />
        ))}
      </>
    );
  }

  if (chatUser) {
    return (
      <>
        <Chats receiver={chatUser} />
      </>
    );
  }
  return (
    <div className='p-3   w-full h-full flex justify-center items-center  '>
      <h1 className='text-5xl'> Find friends 🕵, or chat with'em 🫂.</h1>
    </div>
  );
};

export default page;
