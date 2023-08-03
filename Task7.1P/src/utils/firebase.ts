//get our environment variables from .env in project root
import 'dotenv/config';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'devlink-marketplace.firebaseapp.com',
  projectId: 'devlink-marketplace',
  storageBucket: 'devlink-marketplace.appspot.com',
  messagingSenderId: '729742036861',
  appId: '1:729742036861:web:d25a02ce1f3ba79d50c614',
  measurementId: 'G-PFFL9E5G40',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
