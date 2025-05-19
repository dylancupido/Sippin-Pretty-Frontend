// Action types
export const ADD_TO_CART = "ADD_TO_CART";
export const REGISTER_USER = "REGISTER_USER";

// Action creators
export const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: item,
});

export const registerUser = (userData) => ({
  type: REGISTER_USER,
  payload: userData,
});
