import axios from 'axios';
import LoginPageComponent from './components/LoginPageComponent';
import { useDispatch } from 'react-redux';
import { setReduxUserState } from '../redux/actions/userActions';
const loginUserApiRequest = async (email: any, password: any, doNotLogout: any) => {
  const { data } = await axios.post('/api/users/login', {
    email,
    password,
    doNotLogout,
  });
  
  return data;
};
const LoginPage = () => {
  const reduxDispatch = useDispatch();
    return (
      <LoginPageComponent
        loginUserApiRequest={loginUserApiRequest}
        reduxDispatch={reduxDispatch}
        setReduxUserState={setReduxUserState}
      />
    );
};

export default LoginPage;
