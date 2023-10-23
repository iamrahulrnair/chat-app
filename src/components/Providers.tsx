'use client'

import { GeneralContextProvider } from '@/context/generalContext';
import React from 'react';
import { FC } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from 'next-auth/react';

interface pageProps {
  children: React.ReactNode;
}

export const Providers: FC<pageProps> = ({ children }) => {
  return (
    <>
      <SessionProvider>
        <GeneralContextProvider>
          <ToastContainer />
          {children}
        </GeneralContextProvider>
      </SessionProvider>
    </>
  );
};
