'use client';

import { Button } from '@/components';
import { signIn } from 'next-auth/react';
import React from 'react';
import { FC } from 'react';
import { toast } from 'react-toastify';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const loginWithGithub = async () => {

    setIsLoading(true);
    try {
      await signIn('github', { callbackUrl: 'http://localhost:3000/chats' });
      toast.success('Login success');
    } catch (err) {
      console.log(err);
      toast.error('Login failed.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className='flex h-[100vh] items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='w-full flex flex-col items-center max-w-md space-y-8'>
        <div className='flex flex-col items-center gap-8'>
          <h2 className='mt-6 text-center text-4xl font-bold tracking-tight text-gray-900'>
            Signin to your account
          </h2>
        </div>
        <Button
          isLoading={isLoading}
          onClick={loginWithGithub}
          type='button'
          className='text-white text-3xl  w-full bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg  px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2'
        >
          <svg
            className='w-10 h-10 mr-4'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z'
              clipRule='evenodd'
            />
          </svg>
          Sign in with Github
        </Button>
      </div>
    </div>
  );
};

export default page;
