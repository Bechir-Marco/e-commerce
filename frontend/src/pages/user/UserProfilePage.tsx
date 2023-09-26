import UserProfilePageComponent from "./components/UserProfilePageComponent";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setReduxUserState } from '../../redux/actions/userActions';

const updateUserApiRequest = async (
  name: any,
  lastName: any,
  phoneNumber: any,
  address: any,
  country: any,
  zipCode: any,
  city: any,
  state: any,
  password: any
) => {
  const { data } = await axios.put('/api/users/profile', {
    name,
    lastName,
    phoneNumber,
    address,
    country,
    zipCode,
    city,
    state,
    password,
  });
  return data;
};

const fetchUser = async (id:any) => {
  const { data } = await axios.get('/api/users/profile/' + id);
  return data;
};

const UserProfilePage = () => {
  const reduxDispatch = useDispatch();
  const { userInfo } = useSelector((state:any) => state.userRegisterLogin);

  return (
    <UserProfilePageComponent
      updateUserApiRequest={updateUserApiRequest}
      fetchUser={fetchUser}
      userInfoFromRedux={userInfo}
      setReduxUserState={setReduxUserState}
      reduxDispatch={reduxDispatch}
      localStorage={window.localStorage}
      sessionStorage={window.sessionStorage}
    />
  );
};
export default UserProfilePage;

