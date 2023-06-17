import { Outlet ,Navigate } from "react-router-dom";

const ProtectedRoutesComponenet = () => { 
    const auth = true
    return auth? <Outlet />    : <Navigate to='/login' />
};
export default ProtectedRoutesComponenet;