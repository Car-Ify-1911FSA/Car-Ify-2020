import axios from 'axios';

// ACTION TYPES
const GET_ORDER_HISTORY = 'GET_ORDER_HISTORY';

// ACTION CREATORS
export const getOrderHistory = orderHistory => {
  return {
    type: GET_ORDER_HISTORY,
    orderHistory
  };
};

// THUNKY THUNKS
export const gotOrderHistoryThunk = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/cart/history/${userId}`);
      console.log('Got cart', data);
      dispatch(getOrderHistory(data));
    } catch (error) {
      console.error(error);
    }
  };
};

// REDUCER
const orderHistoryReducer = (state = {}, action) => {
  console.log('state', state, 'action', action);
  switch (action.type) {
    case GET_ORDER_HISTORY:
      return action.orderHistory;
    default:
      return state;
  }
};

export default orderHistoryReducer;
