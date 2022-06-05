import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import Spinner from './Spinner';

export const PrivateRoute = () => {
  // Since useAuthStatus function will return an object that contains loggedIn and checkingStatus, we can destructure it.
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    // Spinner will come here
    return <Spinner />;
  }

  return loggedIn ? <Outlet /> : <Navigate to='/sign-in' />;
};
