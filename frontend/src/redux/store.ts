import { createStore , combineReducers,applyMiddleware} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import { userRegisterLoginReducer } from "./reducers/userReducers";
import { getCategoriesReducer } from "./reducers/categoryReducers";

const reducer = combineReducers({
  cart: cartReducer,
  userRegisterLogin: userRegisterLoginReducer,
  getCategories: getCategoriesReducer,
})

const cartItemsInLocalStorage = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")!) : [];


let userInfoInLocalStorage = {};
const localUserInfo = localStorage.getItem("userInfo");
const sessionUserInfo = sessionStorage.getItem("userInfo");

if (localUserInfo) {
  userInfoInLocalStorage = JSON.parse(localUserInfo);
} else if (sessionUserInfo) {
  userInfoInLocalStorage = JSON.parse(sessionUserInfo);
}


const INITIAL_STATE = {
  cart: {
    cartItems: cartItemsInLocalStorage,
    itemsCount: cartItemsInLocalStorage ? cartItemsInLocalStorage.reduce((quantity:any, item:any) => Number(item.quantity) + quantity, 0) : 0,
    cartSubtotal: cartItemsInLocalStorage ? cartItemsInLocalStorage.reduce((price:any, item:any) => price + item.price * item.quantity, 0) : 0
  },
  userRegisterLogin: { userInfo: userInfoInLocalStorage }
}



const middleware = [thunk]
const store = createStore(reducer, INITIAL_STATE, composeWithDevTools(applyMiddleware(...middleware)));
export default store;