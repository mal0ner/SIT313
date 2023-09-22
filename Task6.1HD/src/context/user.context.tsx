import { auth } from '@/utils/firebase';
import { User } from 'firebase/auth';
import { createContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

interface IUserContext {
  user: User | null | undefined;
  loading: boolean;
  error: Error | undefined;
}

export const UserContext = createContext<IUserContext>({
  user: null,
  loading: false,
  error: undefined,
});

export function UserProvider({ children }: any) {
  const [user, loading, error] = useAuthState(auth);
  const value: IUserContext = { user, loading, error };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
