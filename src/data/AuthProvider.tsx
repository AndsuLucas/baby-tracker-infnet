import React, { createContext, ReactNode } from "react";

interface UserData {
  name: string;
}

interface UserContextData {
  user: UserData | null;
  doLogin: (user: UserData) => void;
  logout: () => void;
  isLogged: () => boolean;
}

interface UserContextProps {
  children: ReactNode;
}

export const UserContext = createContext<UserContextData | undefined>(
  undefined
);

export const UserProvider: React.FC<UserContextProps> = ({ children }) => {
  const [user, setUser] = React.useState<UserData | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? (JSON.parse(storedUser) as UserData) : null;
  });

  const doLogin = (user: UserData) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  }

  const isLogged = () => user !== null

  return (
    <UserContext.Provider value={{ user, doLogin, logout, isLogged }}>
      {children}
    </UserContext.Provider>
  );
};
