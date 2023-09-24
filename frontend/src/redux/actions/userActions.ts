import { AnyAction, Dispatch } from 'redux';
import { LOGIN_USER, LOGOUT_USER } from '../constants/userConstants';
import axios from 'axios';

export const setReduxUserState = (userCreated:any) => (dispatch:any) => {
    dispatch({
        type: LOGIN_USER,
        payload: userCreated
    });
};

export const logout = () =>  (dispatch: Dispatch) => {
    document.location.href = "/login";
    axios.get('/api/logout');
    localStorage.removeItem("userInfo");
    sessionStorage.removeItem("userInfo");
    localStorage.removeItem("cart");
    dispatch({ type: LOGOUT_USER });
};