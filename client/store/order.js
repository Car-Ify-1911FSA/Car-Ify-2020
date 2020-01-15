import axios from 'axios'

const ADD_TO_ORDER = 'ADD_TO_ORDER'
const GET_ALL_ORDERS = 'GET_ALL_ORDERS'

// const addToOrder = order => {
//   return {
//     type: ADD_TO_ORDER,
//     order
//   }
// }

const gotOrders = orders => {
  return {
    type: GET_ALL_ORDERS,
    orders
  }
}

// thunks

export const getOrdersByUser = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orders/${userId}`)
      dispatch(gotOrders(data))
    } catch (error) {
      console.error(error)
    }
  }
}

const OrderReducer = (state = {}, action) => {
  switch (action.type) {
    // case ADD_TO_ORDER:
    //   return action.order
    case GET_ALL_ORDERS:
      return action.orders
    default:
      return state
  }
}

export default OrderReducer
