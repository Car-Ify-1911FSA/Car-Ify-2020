import axios from 'axios';

// INITIAL STATE
const defaultCartDetail = [];

// ACTION TYPES
const GET_CART_ITEMS = 'GET_CART_ITEMS';
const ADD_CART_ITEMS = 'ADD_CART_ITEMS';
const EMPTY_CART_ITEMS = 'EMPTY_CART_ITEMS';

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

export const emptyCartItems = () => {
  return {
    type: EMPTY_CART_ITEMS
  };
};

// THUNKY THUNKS
export const getCartDetail = (cartId, doNotPullLS) => {
  return async dispatch => {
    if (cartId) {
      try {
        const {data} = await axios.get(`/api/cart-product/${cartId}`);
        dispatch(getCartItems(data));
      } catch (error) {
        console.error(error);
      }
    } else if (!doNotPullLS) {
      const guestCart = JSON.parse(localStorage.getItem('cart'));
      dispatch(getCartItems(guestCart));
    }
  };
};

export const addNewCartDetail = (isLoggedIn, newCartItem) => {
  return async dispatch => {
    try {
      if (isLoggedIn) {
        const {data} = await axios.post(`/api/cart-product`, newCartItem);
        console.log('thunky ADD -', data.newOrder);
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
        console.log('thunky EDIT -', data.product);
        dispatch(addCartItems(data.product));
      } else {
        // INCREMENTING QUANTITY FOR GUEST LOCAL STORAGE
        const guestCart = JSON.parse(localStorage.getItem('cart'));
        const incrementIdx = guestCart.findIndex(
          item => item.productId === editCartItem.productId
        );
        const incrementItem = guestCart[incrementIdx];
        const price = incrementItem.totalPrice / incrementItem.quantity;
        incrementItem.quantity++;
        incrementItem.totalPrice = incrementItem.quantity * price;
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
      // RECEIVE FULL UPDATED CART POST DELETING ITEM
      dispatch(getCartItems(data.cartDetail));
    } catch (error) {
      console.error(error);
    }
  };
};

// REDUCER
const cartProductReducer = (state = defaultCartDetail, action) => {
  switch (action.type) {
    case GET_CART_ITEMS:
      return action.cartDetail;
    case ADD_CART_ITEMS:
      console.log('REDUCER UH -', state, action.newCartItem);
      const newState = state.map(item => {
        console.log(item);
      });
      return [...state, action.newCartItem];
    case EMPTY_CART_ITEMS:
      return defaultCartDetail;
    default:
      return state;
  }
};

export default cartProductReducer;
