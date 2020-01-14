import axios from 'axios'

//action types
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'

//action creators
const gotAllProducts = allProducts => {
  return {
    type: GET_ALL_PRODUCTS,
    allProducts
  }
}

//thunk creators
export const loadAllProducts = () => {
  return async dispatch => {
    try {
      // FIXME: need to check route naming
      const {data} = await axios.get('/api/allproducts')
      dispatch(gotAllProducts(data))
    } catch (error) {
      console.error(error)
    }
  }
}

// Reducer

const allProductsReducer = (allProductsState = [], action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.allProducts
    default:
      return allProductsState
  }
}

export default allProductsReducer
