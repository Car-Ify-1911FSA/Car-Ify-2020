import axios from 'axios';

const initialState = {
  cart: {}
};

// ACTION TYPES
const GET_CART = 'GET_CART';
const ADD_CART = 'ADD_CART';

// ACTION CREATORS
const getCart = cart => {
  return {
    type: GET_CART,
    cart
  };
};

const addCart = newCart => {
  return {
    type: ADD_CART,
    newCart
  };
};

// THUNKY THUNKS
export const getActiveCart = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/cart/${userId}`);
      const activeCart = data.filter(cart => cart.status === 'active')[0];
      const adjActiveCart = activeCart === undefined ? {} : activeCart;
      dispatch(getCart(adjActiveCart));
    } catch (error) {
      console.error(error);
    }
  };
};

export const addNewCart = (userId, newCart) => {
  return async dispatch => {
    try {
      console.log('thunky add 1 -', newCart);
      const {data} = await axios.post(`/api/cart/${userId}`, newCart);
      console.log('thunky add 2 -', data);
      dispatch(addCart(data));
    } catch (error) {
      console.error(error);
    }
  };
};

// REDUCER
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case ADD_CART:
      return {...state.cart, ...action.newOrder};
    default:
      return state;
  }
};

export default cartReducer;
