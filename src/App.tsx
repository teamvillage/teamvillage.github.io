import { 
  ErrorPage, 
  Login,
  Signup,
  StudentHome,
} from './screens';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
      errorElement: <ErrorPage />
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
