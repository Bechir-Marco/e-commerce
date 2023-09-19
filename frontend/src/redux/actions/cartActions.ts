
import { AnyAction, AsyncThunkAction } from '@reduxjs/toolkit';
import * as actionTypes from '../constants/cartConstants';

export const addToCart = () => (dispatch:any) => {
    dispatch({
        type: actionTypes.ADD_TO_CART,
        someValue: 0
    });
};
