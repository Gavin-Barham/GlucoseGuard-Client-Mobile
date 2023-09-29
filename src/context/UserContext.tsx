import React, { createContext, useState, ReactNode, useContext, FC, Dispatch, SetStateAction } from 'react';

// Define a type for the context value
type User = {
  isAuthenticated: Boolean;
  id?: number;
  first?: string;
  last?: string;
  email?: string;
  height?: number;
  dailyTarget?: number;
};
type UserContextType = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>
};

const UserContext = createContext<UserContextType | null>(null);



// Define props type for RouterProvider
type UserProviderProps = {
  children: ReactNode;
};

const UserProvider: FC<UserProviderProps> = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState({
    isAuthenticated: false,
  } as User);
  
  const value: UserContextType = {
    user,
    setUser,
  };
  
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

function useUser() {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error('useUser must be used within a RouterProvider');
  }
  return context;
}


export { UserContext, UserProvider, useUser };
