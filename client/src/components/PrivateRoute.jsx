import { useSelector } from 'react-redux'; 
/*useSelector is used to select and retrieve the currentUser from the Redux store's state. 
It determines whether the user is authenticated or not.*/
import { Outlet, Navigate } from 'react-router-dom';
//Outlet : display the content of the child routes if the user is authenticated.
export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Navigate to='/sign-in' />;
}
