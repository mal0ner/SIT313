import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css';

import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import NewJobPage from '@/pages/NewJobPage';
import JobsPage from '@/pages/JobsPage';
import ErrorPage from '@/pages/ErrorPage';

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
        path: 'find-dev',
        element: <FreelanceForm />,
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
    <RouterProvider router={router} />
  </React.StrictMode>,
);
