import configureStore from "@reduxjs/toolkit";

const counterReducer = (state = { value: 0 }) => {
  return state;
};

const store = configureStore(counterReducer);

console.log(store.getState());

export default store;
