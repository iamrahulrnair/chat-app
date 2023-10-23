'use client';

import React, { useState, createContext, useEffect } from 'react';

export const GeneralContext = createContext<{
  searchedUsers: any;
  chatUser: User | null;
  setSearchedUsers: any;
  setChatUser: any;
  friends:
    | {
        follower_id: string;
        followee_id: string;
        createdAt: string;
        updatedAt: string;
        follower: User;
      }[]
    | null;
  setFriends: any;
}>({
  searchedUsers: [],
  chatUser: null,
  friends: null,
  setFriends: () => {},
  setSearchedUsers: () => {},
  setChatUser: () => {},
});

export const GeneralContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [chatUser, setChatUser] = useState(null);
  const [friends, setFriends] = useState(null);

  const state = {
    searchedUsers,
    chatUser,
    setSearchedUsers,
    setChatUser,
    friends,
    setFriends,
  };

  return (
    <GeneralContext.Provider value={{ ...state }}>
      {children}
    </GeneralContext.Provider>
  );
};
