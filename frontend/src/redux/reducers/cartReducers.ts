import { AnyAction } from 'redux';
import * as actionTypes from '../constants/cartConstants';

export const counterReducer = (state = { value: 0 }, action:any) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            return { value: state.value + 1 + action.someValue };
        default:
            return state;
    }
};