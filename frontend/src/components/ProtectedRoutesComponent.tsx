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
    console.log('1');
  return <LoginPage/>;
}

else if (isAuth  && admin) {
    console.log('2');
    return <Outlet />;
}
else if (isAuth  && !admin) {
console.log('3');  return (
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
