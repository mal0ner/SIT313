//get our environment variables from .env in project root
// import 'dotenv/config';

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
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
  addDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment,
  where,
  or,
  orderBy,
} from 'firebase/firestore';

import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

import { v4 } from 'uuid';

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
const storage = getStorage(app);
const analytics = getAnalytics(app);

export type UserDoc = {
  createdAt: Timestamp;
  displayName: string;
  email: string;
  photoURL: string;
  posts: string[];
  likedPosts: string[];
  appliedPosts: string[];
};

export type Experience = {
  type: string;
  years: number;
};

export type Post = {
  postId: string;
  userId: string;
  userRole: string;
  jobType: 'employment' | 'freelance';
  title: string;
  business: string;
  description: string;
  skills: string[];
  createdDate: Timestamp;
  projectLength: string;
  paymentMin: number;
  paymentMax: number;
  workingHours: number;
  experience: Experience[] | null;
  experienceTypes: string[];
  likes: number;
  applicants: string[];
  imageURL: string | null;
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
  const postsQuery = query(
    collection(db, 'posts'),
    limit(20),
    orderBy('createdDate', 'desc'),
  );
  const snapshot = await getDocs(postsQuery);
  const data: Post[] = [];
  snapshot.forEach((doc) => {
    const post: Post = doc.data() as Post;
    // this should allow for us to 'skip' over incoming posts whose id matches a list of 'deleted'
    // posts by the user
    post.postId = doc.id;
    data.push(post);
  });
  return data;
}

export async function likePost(userAuth: User, postId: string) {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const postRef = doc(db, 'posts', postId);

  await updateDoc(userDocRef, {
    likedPosts: arrayUnion(postId),
  });
  await updateDoc(postRef, {
    likes: increment(1),
  });
}

export async function unlikePost(userAuth: User, postId: string) {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const postRef = doc(db, 'posts', postId);
  await updateDoc(userDocRef, {
    likedPosts: arrayRemove(postId),
  });
  await updateDoc(postRef, {
    likes: increment(-1),
  });
}

export async function applyToPost(userAuth: User, postId: string) {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const postRef = doc(db, 'posts', postId);
  await updateDoc(userDocRef, {
    appliedPosts: arrayUnion(postId),
  });
  await updateDoc(postRef, {
    applicants: arrayUnion(userAuth.uid),
  });
}

export async function unapplyToPost(userAuth: User, postId: string) {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const postRef = doc(db, 'posts', postId);
  await updateDoc(userDocRef, {
    appliedPosts: arrayRemove(postId),
  });
  await updateDoc(postRef, {
    applicants: arrayRemove(userAuth.uid),
  });
}

export async function uploadImageReturnURL(imageList: FileList | null) {
  if (imageList == null) return null;
  const image = imageList[0];
  // make sure each image has a unique url
  const imageRef = ref(storage, `images/${image.name + v4()}`);
  await uploadBytes(imageRef, image);
  const URL = await getDownloadURL(imageRef);
  return URL;
}

export async function checkIsPostApplied(userAuth: User, postId: string) {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  const userData = userSnapshot.data() as UserDoc;
  return userData.appliedPosts.includes(postId);
}

async function getPostsByTitle(titles: string[]) {
  const postsQuery = query(
    collection(db, 'posts'),
    limit(20),
    where('title', 'in', titles),
  );
  const snapshot = await getDocs(postsQuery);
  const data: Post[] = [];
  snapshot.forEach((doc) => {
    const post: Post = doc.data() as Post;
    post.postId = doc.id;
    data.push(post);
  });
  return data;
}

async function getPostsBySkills(skills: string[]) {
  console.log(`got skills: ${skills}`);
  const postsQuery = query(
    collection(db, 'posts'),
    or(
      where('skills', 'array-contains-any', skills),
      where('experienceTypes', 'array-contains-any', skills),
    ),
  );
  const snapshot = await getDocs(postsQuery);
  const data: Post[] = [];
  snapshot.forEach((doc) => {
    const post: Post = doc.data() as Post;
    post.postId = doc.id;
    data.push(post);
  });
  return data;
}

async function getPostsByTitleAndSkills(titles: string[], skills: string[]) {
  const postsQuery = query(
    collection(db, 'posts'),
    limit(20),
    where('title', 'in', titles),
    where('skills', 'array-contains-any', skills),
  );
  const snapshot = await getDocs(postsQuery);
  const data: Post[] = [];
  snapshot.forEach((doc) => {
    const post: Post = doc.data() as Post;
    post.postId = doc.id;
    data.push(post);
  });
  return data;
}

export async function getPostsWithQuery(titles: string[], skills: string[]) {
  if (titles.length == 0 && skills.length == 0) {
    return await getPosts();
  } else if (titles.length > 0 && skills.length == 0) {
    return await getPostsByTitle(titles);
  } else if (titles.length == 0 && skills.length > 0) {
    return await getPostsBySkills(skills);
  } else {
    console.log(
      `querying both, skills length: ${skills.length}, titles len: ${titles.length}`,
    );
    return await getPostsByTitleAndSkills(titles, skills);
  }
}

export async function getPostsById(postIDs: string[]) {
  const posts: Post[] = await Promise.all(
    postIDs.map(async (id) => {
      const ref = doc(db, 'posts', id);
      const snap = await getDoc(ref);
      const p = snap.data() as Post;
      p.postId = snap.id;
      return p;
    }),
  );
  return posts;
}

export async function getUserData(userUID: string) {
  const userDocRef = doc(db, 'users', userUID);
  const userSnapshot = await getDoc(userDocRef);

  if (userSnapshot.exists()) {
    return userSnapshot.data() as UserDoc;
  }
  return null;
}

export async function checkIsPostLiked(userAuth: User, postId: string) {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  const userData = userSnapshot.data() as UserDoc;
  return userData.likedPosts.includes(postId);
}

export async function createUserDocFromAuth(userAuth: User, name: string) {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);

  // only create if the document does not exist
  if (!userSnapShot.exists()) {
    try {
      await setDoc(userDocRef, {
        displayName: name,
        email: userAuth.email,
        createdAt: Timestamp.now(),
        photoURL: userAuth.photoURL,
        likedPosts: [],
        appliedPosts: [],
      });
    } catch (error: any) {
      alert(
        `Error in creating user document in firestore database, message: ${error.message}`,
      );
    }
  }

  return userDocRef;
}

export async function createPost(userAuth: User, formValues: Post) {
  const postsRef = collection(db, 'posts');

  const userDocRef = doc(db, 'users', userAuth.uid);
  const postRef = await addDoc(postsRef, formValues);
  await updateDoc(userDocRef, {
    posts: arrayUnion(postRef.id),
  });
}
