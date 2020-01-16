import axios from 'axios';

const GET_CART = 'GET_CART';
const ADD_CART = 'ADD_CART';

const initialState = {
  cart: {}
};

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
      dispatch(getCart(activeCart));
    } catch (error) {
      console.error(error);
    }
  };
};

export const adddNewCart = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/cart/${userId}`, [
        '! FILL ME OUT !'
      ]);
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
