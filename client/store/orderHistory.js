import axios from 'axios';

//ACTION TYPES
const GET_ORDER_HISTORY = 'GET_ORDER_HISTORY';

//ACTION CREATORS
const getOrderHistory = orderHistory => {
  return {
    type: GET_ORDER_HISTORY,
    orderHistory
  };
};

//THUNKY-THUNK
export const getOrderHistoryThunk = userId => {
  return async dispatch => {
    try {
      console.log('thunky 1', userId);
      const {data} = await axios.get(`/api/cart/${userId}`);
      const cartHistory = data.filter(cart => cart.status !== 'active');
      dispatch(getOrderHistory(cartHistory));
    } catch (error) {
      console.error(error);
    }
  };
};

// REDUCER
const orderHistoryReducer = (state = [], action) => {
  console.log('state', action.orderHistory);
  switch (action.type) {
    case GET_ORDER_HISTORY:
      return action.orderHistory;
    default:
      return state;
  }
};

export default orderHistoryReducer;
