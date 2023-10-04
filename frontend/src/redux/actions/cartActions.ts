import * as actionTypes from "../constants/cartConstants";
import axios from "axios";

export const addToCart = (productId: any, quantity: any) => async (dispatch:any, getState:any) => {
    const { data } = await axios.get(`/api/products/get-one/${productId}`);
    dispatch({
        type: actionTypes.ADD_TO_CART,
        payload: {
            productID: data._id,
            name: data.name,
            price: data.price,
            image: data.images[0] ?? null,
            count: data.count,
            quantity,
        },
    });

    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productID: any, quantity: any, price: any) => (dispatch:any, getState:any) => {
    dispatch({
        type: actionTypes.REMOVE_FROM_CART,
        payload: { productID: productID, quantity: quantity, price: price }
    });
    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};