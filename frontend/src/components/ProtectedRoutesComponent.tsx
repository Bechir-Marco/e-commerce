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
  axios
    .get('/api/get-token')
    .then(function (data) {
      if (data.data.token) {
        setIsAuth(data.data.token);
      }
      return isAuth;
    })
    .catch(function (error) {
      if (error.response && error.response.status === 401) {
        // Handle 401 unauthorized error here
        // For example, you can redirect to the login page or show an error message to the user
        window.location.href = '/login'; // Redirect to the login page
        // Or you can display an error message to the user
        // setError('Unauthorized. Please log in.');
      } else {
        // Handle other errors here
        console.error('An error occurred:', error);
      }
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
