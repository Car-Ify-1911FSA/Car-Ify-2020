import axios from 'axios';

//action types
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';

//action creators
const gotAllProducts = allProducts => {
  return {
    type: GET_ALL_PRODUCTS,
    allProducts
  };
};

//thunk creators
export const loadAllProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products');
      dispatch(gotAllProducts(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const editProducts = editProduct => {
  return async dispatch => {
    try {
      const {data} = await axios.put('/api/products', editProduct);
      dispatch(gotAllProducts(data.allProducts));
    } catch (error) {
      console.error(error);
    }
  };
};

// Reducer
const allProductsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.allProducts;
    default:
      return state;
  }
};

export default allProductsReducer;
