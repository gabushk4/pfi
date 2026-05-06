import { createContext, useContext, useState, ReactNode } from 'react';

type Account = {
  username: string;
  email: string,
  id: number,
  emailVerified: boolean,
  address: string,
  mdp: string,
  admin: boolean
}

type AccountContextType = {
  account: Account | null;
  login: (account: Account) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

const AccountContext = createContext<AccountContextType>({
  account: null,
  login: () => {},
  logout: () => {},
  isLoggedIn: false,
});

export function AccountProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<Account | null>(null);

  const login = (account: Account) => {
    console.log(`${account.username} loggin in`)
    setAccount(account)
  };
  const logout = () => setAccount(null);

  return (
    <AccountContext.Provider value={{ account, login, logout, isLoggedIn: account !== null }}>
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  const context = useContext(AccountContext);
  if (!context) throw new Error('useAccount must be used within an AccountProvider');
  return context;
}