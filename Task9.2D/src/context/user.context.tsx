import { UserDoc, auth, getUserData } from '@/utils/firebase';
import { User } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

interface IUserContext {
  user: User | null | undefined;
  userDoc: UserDoc | null;
  loading: boolean;
  error: Error | undefined;
}

export const UserContext = createContext<IUserContext>({
  user: null,
  userDoc: null,
  loading: false,
  error: undefined,
});

export function UserProvider({ children }: any) {
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = useState<UserDoc | null>(null);

  useEffect(() => {
    async function getData() {
      if (!user) return;
      const profile = await getUserData(user.uid);
      setUserData(profile);
    }
    getData();
  }, [user]);
  const value: IUserContext = { user, userDoc: userData, loading, error };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
