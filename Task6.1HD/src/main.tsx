import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UserProvider } from '@/context/user.context';
import App from './App';
import './index.css';

import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import NewJobPage from '@/pages/NewJobPage';
import JobsPage from '@/pages/JobsPage';
import ErrorPage from '@/pages/ErrorPage';
import ProfilePage, {
  AppliedPosts,
  LikedPosts,
  MyPosts,
} from '@/pages/ProfilePage';
import PrivacyPage from '@/pages/PrivacyPage';
import TermsPage from '@/pages/TermsPage';
import ConductPage from '@/pages/ConductPage';

import FreelanceForm from '@/components/FreelanceForm';
import EmploymentForm from '@/components/EmploymentForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: 'find/',
        element: <NewJobPage />,
        children: [
          {
            path: 'freelancers',
            element: <FreelanceForm />,
          },
          {
            path: 'employees',
            element: <EmploymentForm />,
          },
        ],
      },
      {
        path: 'jobs/',
        element: <JobsPage />,
      },
      {
        path: 'profile/',
        element: <ProfilePage />,
        children: [
          {
            path: 'posts',
            element: <MyPosts />,
          },
          {
            path: 'likes',
            element: <LikedPosts />,
          },
          {
            path: 'applications',
            element: <AppliedPosts />,
          },
        ],
      },
      {
        path: 'privacy',
        element: <PrivacyPage />,
      },
      {
        path: 'terms',
        element: <TermsPage />,
      },
      {
        path: 'conduct',
        element: <ConductPage />,
      },
    ],
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'signup',
    element: <SignupPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>,
);
