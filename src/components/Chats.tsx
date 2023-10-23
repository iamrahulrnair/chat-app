'use client';

import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '.';
import Image from 'next/image';
import { ChatList } from '.';
import { pusherClient } from '@/lib/pusher';

export function Chats({ receiver }: { receiver: User }) {
  const { data: session, status } = useSession();
  const sender = session?.user as User;
  const [chats, setChats] = React.useState<Message[] | null>(null);
  const [text, setText] = React.useState<string>('');
  const [isSending, setIsSending] = React.useState<boolean>(false);

  const handleMessageSend = async () => {
    setIsSending(true);
    try {
      const response = await fetch('/api/friend/chats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ receiverId: receiver.id, text }),
      });
      setText('');
    } catch (err) {
      console.log(err);
    } finally {
      setIsSending(false);
    }
  };
  useEffect(() => {
    function messageHandler({ message }: { message: Message }) {
      setChats((prev) => [message, ...prev!]);
    }
    if (status === 'authenticated') {
      pusherClient.subscribe(`private_${sender.id}`);
      pusherClient.bind('incoming-message', messageHandler);
      return () => {
        pusherClient.unsubscribe(`private_${sender.id}`);
        pusherClient.unbind('incoming-message', messageHandler);
      };
    }
  }, [status]);

  useEffect(() => {
    if (status === 'authenticated') {
      (async () => {
        try {
          const response = await fetch(
            `/api/friend/chats?reciever=${receiver.id}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          const data = await response.json();
          setChats(data);
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [status]);

  return (
    <div className='h-full'>
      <div className='border-b-orange-800 border-b-2'>
        <div className='flex items-center justify-between '>
          <div className='flex items-center p-4'>
            <Image
              src={receiver!.image}
              alt=''
              className='h-[40px] w-[40px] rounded-full'
              width={40}
              height={40}
            />
            <div className='ml-2 text-lg font-semibold'>
              {receiver.username}
            </div>
          </div>
          <div className='flex items-center'>
            <Button className='mr-2'>Video</Button>
            <Button>Audio</Button>
          </div>
        </div>
      </div>
      <div className='max-h-[600px] bg-gradient-to-r from-slate-100 to-yellow-100 h-full p-10 min-h-[600px] overflow-auto bg-gray-100'>
        <ChatList chats={chats} />
      </div>
      <hr />
      <div className='p-6 flex items-center justify-center'>
        <div className='grow'>
          <label
            htmlFor='message'
            className='block mb-2 text-lg font-medium text-gray-900  dark:text-white'
          >
            Message
          </label>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            id='message'
            className='h-[50px] text-2xl'
          />
        </div>
        <Button
          disabled={text == ''}
          isLoading={isSending}
          onClick={handleMessageSend}
          className='relative top-[10px] disabled:opacity-50 disabled:cursor-not-allowed ml-2'
        >
          Send
        </Button>
      </div>
    </div>
  );
}
