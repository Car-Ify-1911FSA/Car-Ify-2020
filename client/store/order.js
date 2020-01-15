import axios from 'axios';

const ADD_TO_ORDER = 'ADD_TO_ORDER';
const GET_ALL_ORDERS = 'GET_ALL_ORDERS';

const initialState = {
  orders: {}
}

const addToOrder = newOrder => {
  return {
    type: ADD_TO_ORDER,
    newOrder
  }
}

const gotOrders = orders => {
  return {
    type: GET_ALL_ORDERS,
    orders
  };
};

// thunks

export const getOrdersByUser = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orders/${userId}`);
      dispatch(gotOrders(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const addNewOrder = (newOrder, routeVerb) => {
  // return routeVerb ? post : put
}

const OrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_ORDER:
      return {
        ...state,
        orders: {...state.orders, ...action.newOrder}
      }
    case GET_ALL_ORDERS:
      return {...state, orders: action.orders}
    default:
      return state;
  }
};

export default OrderReducer;
