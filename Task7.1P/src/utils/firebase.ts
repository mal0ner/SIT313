//get our environment variables from .env in project root
// import 'dotenv/config';

import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import {
  getAuth,
  createUserWithEmailAndPassword,
  UserCredential,
  fetchSignInMethodsForEmail,
  User,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCfSqLAb2nKru3uwSMcI4TkY1TEgy00mYs',
  authDomain: 'devlink-marketplace.firebaseapp.com',
  projectId: 'devlink-marketplace',
  storageBucket: 'devlink-marketplace.appspot.com',
  messagingSenderId: '729742036861',
  appId: '1:729742036861:web:d25a02ce1f3ba79d50c614',
  measurementId: 'G-PFFL9E5G40',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore(app);

// from https://stackoverflow.com/questions/51562995/how-can-i-check-if-user-exists-in-firebase
export async function checkUserExists(email: string): Promise<boolean> {
  let signInMethods: string[] = await fetchSignInMethodsForEmail(auth, email);
  //This will be > 0 if the user exists in the DB
  return signInMethods.length > 0;
}

export async function createAuthUserWithEmailAndPassword(
  email: string,
  password: string,
): Promise<UserCredential> {
  return await createUserWithEmailAndPassword(auth, email, password);
}

export async function loginAuthUserWithEmailAndPassword(
  email: string,
  password: string,
) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function createUserDocFromAuth(userAuth: User, name: string) {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const { email } = userAuth;
    const createdAt = new Date();
    const displayName = name;

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error: any) {
      console.log(
        'error in creating user document in firestore database',
        error.message,
      );
    }
  }

  return userDocRef;
}
