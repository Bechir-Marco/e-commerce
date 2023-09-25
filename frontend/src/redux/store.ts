import { createStore , combineReducers,applyMiddleware} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { counterReducer } from "./reducers/cartReducers";
import { userRegisterLoginReducer } from "./reducers/userReducers";

const reducer = combineReducers({
  cart: counterReducer,
  userRegisterLogin: userRegisterLoginReducer
})
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
   value : 0
  },
  userRegisterLogin: { userInfo: userInfoInLocalStorage }
}



const middleware = [thunk]
const store = createStore(reducer, INITIAL_STATE, composeWithDevTools(applyMiddleware(...middleware)));
export default store;