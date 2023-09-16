import React from 'react';
import { 
  ErrorPage, 
  Login,
  Signup,
  StudentHome,
} from './screens';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

function App() {
  const isLogin = false;

  const router = createBrowserRouter([
    {
      path: '/',
      element: isLogin ? <Navigate to={'/login'} /> : <Navigate to={'/login'} />,
      errorElement: <ErrorPage />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signup',
      element: <Signup />
    },
    {
      path: '/student',
      element: <StudentHome />
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
