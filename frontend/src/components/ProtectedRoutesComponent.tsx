import { Outlet, Navigate } from 'react-router-dom';
import UserChatComponent from './user/UserChatComponent';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LoginPage from '../pages/LoginPage';

interface ProtectedRoutesProps {
  admin: any;
}

const ProtectedRoutesComponent: React.FC<ProtectedRoutesProps> = ({
  admin
}) => {
  const [isAuth, setIsAuth] = useState();

  useEffect(() => {
    axios.get('/api/get-token').then(function (data) {
      if (data.data.token) {
        setIsAuth(data.data.token);
      }
     
      return isAuth;
    });
  }, [isAuth]);

  if (isAuth === undefined) {
  return <LoginPage/>;
}

else if (isAuth  && admin) {
  // Authenticated admin users can access the protected content.
  return <Outlet />;
}
else 
if (isAuth  && !admin) {
  // Non-admin users with 'admin' as isAuth are redirected to the login page.
  return (
    <>
      <UserChatComponent />
      <Outlet />
    </>
  );
    }
    else 
  return <LoginPage/>;
}

export default ProtectedRoutesComponent
