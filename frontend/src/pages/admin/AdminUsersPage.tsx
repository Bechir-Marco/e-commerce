import UsersPageComponent from "./components/UsersPageComponent";
import axios from "axios";

const fetchUsers = async () => { 
    const {data} = await axios.get("/api/users")
    return data
};
const AdminUsersPage = () => {
    return <UsersPageComponent fetchUsers={fetchUsers} />;
};

export default AdminUsersPage;

