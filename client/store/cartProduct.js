import axios from 'axios';

const initialState = {
  cartDetail: {}
};

// ACTION TYPES
const GET_CART_ITEMS = 'GET_CART_ITEMS';

// ACTION CREATORS
const getCartItems = cartDetail => {
  return {
    type: GET_CART_ITEMS,
    cartDetail
  };
};

// THUNKY THUNKS
export const getCartDetail = cartId => {
  return async dispatch => {
    try {
      console.log('detail thunk -', cartId);
      const {data} = await axios.get(`/api/cart-product/${cartId}`);
      // const activeCart = data.filter(cart => cart.status === 'active')[0];
      dispatch(getCartItems(data));
    } catch (error) {
      console.error(error);
    }
  };
};

// REDUCER
const cartProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART_ITEMS:
      return action.cartDetail;
    default:
      return state;
  }
};

export default cartProductReducer;
