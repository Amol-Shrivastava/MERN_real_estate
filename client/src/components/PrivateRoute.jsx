import {useSelector} from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
    const {currentUser} = useSelector(state => state.user)
    // console.log(currentUser)
  return Object.keys(currentUser).includes('success') ? <Outlet /> : <Navigate to="/sign-in"/>
}

export default PrivateRoute