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
  updateProfile,
  signOut,
} from 'firebase/auth';

import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  limit,
  query,
  Timestamp,
} from 'firebase/firestore';
import { getCustomAvatarURL } from '@/utils/avatars';

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

export type UserDoc = {
  createdAt: Timestamp;
  displayName: string;
  email: string;
  photoURL: string;
};

type Experience = {
  type: string;
  years: number;
};

export type Post = {
  jobType: 'employment' | 'freelance';
  userId: string;
  createdDate: Timestamp;
  title: string;
  business: string;
  description: string;
  projectLength: string;
  paymentMin: number;
  paymentMax: number;
  workingHours: number;
  experience: Experience[] | null;
};

export const auth = getAuth();
export const db = getFirestore(app);

// from https://stackoverflow.com/questions/51562995/how-can-i-check-if-user-exists-in-firebase
export async function checkUserExists(email: string): Promise<boolean> {
  let signInMethods: string[] = await fetchSignInMethodsForEmail(auth, email);
  //This will be > 0 if the user exists in the DB
  return signInMethods.length > 0;
}

export async function handleUserSignupEmailPassword(
  email: string,
  password: string,
  name: string,
) {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    // This generates a random but deterministic embedded avatar URL from boringAvatars package which we
    // can then store in their Auth userProfile information for access whenever we want to display their
    // profile pic
    const avatarURL = getCustomAvatarURL(email);
    await updateProfile(user, { displayName: name, photoURL: avatarURL });
    await createUserDocFromAuth(user, name);
  } catch (error) {
    throw error;
  }
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

export async function signOutCurrentUser() {
  if (!auth.currentUser) {
    return;
  }
  await signOut(auth);
}

export async function getPosts() {
  // const querySnapshot = collection(db, 'posts');
  // const q = query(docRef);
  const postsQuery = query(collection(db, 'posts'), limit(20));
  const snapshot = await getDocs(postsQuery);
  // const querySnapShot = await getDocs(collection(db, 'posts'));
  const data: Post[] = [];
  snapshot.forEach((doc) => {
    data.push(doc.data() as Post);
  });
  //
  // q.forEach((doc) => {
  //   data.push(doc.data() as Post);
  // });
  return data;
}

export async function getUserData(userUID: string) {
  const userDocRef = doc(db, 'users', userUID);
  const userSnapshot = await getDoc(userDocRef);

  if (userSnapshot.exists()) {
    return userSnapshot.data() as UserDoc;
  }
  return null;
}

export async function createUserDocFromAuth(userAuth: User, name: string) {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);

  // only create if the document does not exist
  if (!userSnapShot.exists()) {
    const { email } = userAuth;
    const createdAt = new Date();
    const displayName = name;
    const photoURL = userAuth.photoURL;

    try {
      await setDoc(userDocRef, { displayName, email, createdAt, photoURL });
    } catch (error: any) {
      console.log(
        'error in creating user document in firestore database',
        error.message,
      );
    }
  }

  return userDocRef;
}
