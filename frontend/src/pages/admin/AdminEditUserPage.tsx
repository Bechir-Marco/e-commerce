import EditUserPageComponent from './components/EditUserPageComponent';
import axios from 'axios';

const fetchUser = async (userId: any) => {
  try {
    const response = await axios.get(`/api/users/${userId}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Failed to fetch user. Status: ${response.status}`);
    }
  } catch (error:any) {
    
    console.error(`Error in fetchUser: ${error.message}`);
    throw error;
  }
};


const updateUserApiRequest = async (userId: any, name: any, lastName: any, email: any, isAdmin: any) => {
  try {
    const response = await axios.put(`/api/users/${userId}`, {
      name,
      lastName,
      email,
      isAdmin,
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Failed to update user. Status: ${response.status}`);
    }
  } catch (error:any) {
   
    throw error;
  }
};


const AdminEditUserPage = () => {
  return (
    <EditUserPageComponent
      updateUserApiRequest={updateUserApiRequest}
      fetchUser={fetchUser}
    />
  );
};

export default AdminEditUserPage;
