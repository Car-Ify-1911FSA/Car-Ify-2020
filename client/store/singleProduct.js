import axios from 'axios'

//Action types
const GET_PRODUCT = 'GET_PRODUCT'

//Action creator
const gotProduct = product => {
  return {
    type: GET_PRODUCT,
    product
  }
}

//Thunk creator
export const loadProduct = productId => {
  return async dispatch => {
    try {
      //need to check route naming
      const {data} = await axios.get(`api/allproducts/${productId}`)
      dispatch(gotProduct(data))
    } catch (error) {
      console.error(error)
    }
  }
}

//Reducer
const SingleProductReducer = (singleProductState = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    default:
      return singleProductState
  }
}

export default SingleProductReducer
