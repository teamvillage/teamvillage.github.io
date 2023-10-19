import { 
  ErrorPage, 
  Login,
  ProfessorHome,
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
    },
    {
      path: '/professor',
      element: <ProfessorHome />
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
