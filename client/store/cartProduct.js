import axios from 'axios';

const initialState = {
  cartDetail: {}
};

// ACTION TYPES
const GET_CART_ITEMS = 'GET_CART_ITEMS';
const ADD_CART_ITEMS = 'ADD_CART_ITEMS';

// ACTION CREATORS
const getCartItems = cartDetail => {
  return {
    type: GET_CART_ITEMS,
    cartDetail
  };
};

const addCartItems = newCartItem => {
  return {
    type: ADD_CART_ITEMS,
    newCartItem
  };
};

// THUNKY THUNKS
export const getCartDetail = cartId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/cart-product/${cartId}`);
      dispatch(getCartItems(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const addNewCartDetail = (isLoggedIn, newCartItem) => {
  return async dispatch => {
    try {
      if (isLoggedIn) {
        const {data} = await axios.post(`/api/cart-product`, newCartItem);
        dispatch(addCartItems(data));
      } else {
        console.log('GUEST LOCAL STORAGE!');
        let currentCart;
        // if cart already exist in local storage
        if (localStorage.getItem('cart')) {
          currentCart = JSON.parse(localStorage.getItem('cart'));

          let searchId = currentCart.findIndex(
            el => el.id === newCartItem.productid
          );

          if (searchId > -1) {
            currentCart[searchId].quantity += newCartItem.quantity;
          } else {
            currentCart.push(newCartItem);
          }

          dispatch(addCartItems(currentCart));
          localStorage.setItem('cart', JSON.stringify(currentCart));
        } else {
          console.log('No LSCart');
          currentCart = [newCartItem];
          localStorage.setItem('cart', JSON.stringify(currentCart));
          dispatch(currentCart);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const editNewCartDetail = (isLoggedIn, editCartItem) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/cart-product/${cartId}`, [
        '! FILL ME OUT !'
      ]);
      dispatch(addCartItems(data));
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
    case ADD_CART_ITEMS:
      // console.log(action.newCartItem);
      return {...state.cartDetail, ...action.newCartItem};
    default:
      return state;
  }
};

//-------------LocalStorage -----------

// let currentCart;
// if (localStorage.getItem('cart')) {
//   currentCart = JSON.parse(localStorage.getItem('cart'))
// }

export default cartProductReducer;
