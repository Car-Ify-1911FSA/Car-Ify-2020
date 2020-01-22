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
      const dateConverter = elem => {
        const year = elem.time.slice(0, 4);
        const monthAndDay = elem.time.slice(5, 10);
        elem.time = monthAndDay + '-' + year;
        return elem;
      };
      const filteredData = data.filter(cart => cart.status !== 'active');
      const cartHistory = filteredData.map(dateConverter);
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