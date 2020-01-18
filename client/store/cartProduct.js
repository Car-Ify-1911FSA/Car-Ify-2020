import axios from 'axios';

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
    if (cartId) {
      try {
        const {data} = await axios.get(`/api/cart-product/${cartId}`);
        dispatch(getCartItems(data));
      } catch (error) {
        console.error(error);
      }
    } else {
      dispatch(getCartItems(JSON.parse(localStorage.getItem('cart'))));
    }
  };
};

export const addNewCartDetail = (isLoggedIn, newCartItem) => {
  return async dispatch => {
    try {
      if (isLoggedIn) {
        const {data} = await axios.post(`/api/cart-product`, newCartItem);
        dispatch(addCartItems(data.newOrder));
      } else {
        // IF CART ALREADY EXIST IN LOCAL STORAGE
        let currentCart;
        delete newCartItem.cartId;
        if (localStorage.getItem('cart')) {
          currentCart = JSON.parse(localStorage.getItem('cart'));

          let searchId;
          currentCart.forEach(el => {
            if (el.productId === newCartItem.productId) {
              searchId = currentCart.indexOf(el);
            }
          });
          if (searchId > -1) {
            currentCart[searchId].quantity += newCartItem.quantity;
            currentCart[searchId].totalPrice += newCartItem.totalPrice;
          } else currentCart.push(newCartItem);

          localStorage.setItem('cart', JSON.stringify(currentCart));
          dispatch(getCartItems(currentCart));
        } else {
          // IF NO EXISTING LOCAL STORAGE, CREATE NEW CART IN LOCAL STORAGE
          currentCart = [newCartItem];
          localStorage.setItem('cart', JSON.stringify(currentCart));
          dispatch(getCartItems(currentCart));
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
      if (isLoggedIn) {
        const {data} = await axios.put(`/api/cart-product`, editCartItem);
        dispatch(addCartItems(data.product));
      } else {
        // INCREMENTING QUANTITY FOR GUEST LOCAL STORAGE
        const guestCart = JSON.parse(localStorage.getItem('cart'));
        const incrementIdx = guestCart.findIndex(
          item => item.productId === editCartItem.productId
        );
        const incrementItem = guestCart[incrementIdx];
        incrementItem.quantity++;
        localStorage.setItem('cart', JSON.stringify(guestCart));
        dispatch(getCartItems(guestCart));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteCartDetail = editCartItem => {
  return async dispatch => {
    try {
      const {cartId, productId} = editCartItem;
      const {data} = await axios.delete(
        `/api/cart-product/${cartId}/${productId}`
      );
      // RECEIVE FULL UPDATED CART WITH DELETED ITEM
      dispatch(getCartItems(data.cartDetail));
    } catch (error) {
      console.error(error);
    }
  };
};

// REDUCER
const cartProductReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CART_ITEMS:
      return action.cartDetail;
    case ADD_CART_ITEMS:
      return [...state, action.newCartItem];
    default:
      return state;
  }
};

export default cartProductReducer;
