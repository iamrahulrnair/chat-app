import React from 'react';
import { useSession } from 'next-auth/react';
import { format } from 'date-fns';

export function ChatList({ chats }: { chats: Message[] | null }) {
  const { data: session, status } = useSession();
  const sender = session?.user as User;
  function formatTimeStamp(timestamp: Date) {
    // console.log(timestamp);

    return timestamp && format(new Date(timestamp), 'HH:mm');
  }

  if (!chats) return null;

  if (chats.length == 0) {
    return <div>
      <p className='text-center text-2xl mt-[100px]'>No messages yet.</p>
    </div>;
  }
  return (
    <div className='flex flex-col-reverse h-full overflow-auto   space-y-8'>
      {chats.map((chat) => {
        console.log({chat});
        
        const isSender = chat.senderId == sender.id;

        return (
          <div className={`m-4  ${isSender ? '' : 'self-end'}`} key={chat.id}>
            <p
              className={`inline-block p-4 mr-4  text-2xl border-gray-300 border ${
                isSender
                  ? 'bg-white rounded-r-xl rounded-tl-xl'
                  : 'bg-blue-500 rounded-l-xl rounded-tr-xl text-white'
              }`}
            >
              {chat.text}
            </p>
            <span className='opacity-80'>
              {formatTimeStamp(chat.createdAt)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
