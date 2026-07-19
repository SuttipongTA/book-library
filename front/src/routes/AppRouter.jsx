// ref: 37aa88161f
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import LoginForm from '../layout/LoginForm';
import BookLibrary from '../layout/BookLibrary';
import Header from '../layout/Header';
import useAuth from '../hooks/useAuth';

const guestRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <LoginForm /> },
      { path: '/login', element: <LoginForm /> },
    ],
  },
]);

const userRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <BookLibrary /> },
      { path: '/login', element: <BookLibrary /> },
    ],
  },
]);

export default function AppRouter() {
  const { token } = useAuth();
  const finalRouter = token ? userRouter : guestRouter;
  return <RouterProvider router={finalRouter} />;
}