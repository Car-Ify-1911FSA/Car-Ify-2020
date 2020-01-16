import axios from 'axios';

const ADD_ORDER = 'ADD_ORDER';
const GET_CART = 'GET_CART';

const initialState = {
  cart: {}
};

const addOrder = newOrder => {
  return {
    type: ADD_ORDER,
    newOrder
  };
};

const getCart = cart => {
  return {
    type: GET_CART,
    cart
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

// REDUCER
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      return {...state.cart, ...action.newOrder};
    case GET_CART:
      return action.cart;
    default:
      return state;
  }
};

export default cartReducer;
