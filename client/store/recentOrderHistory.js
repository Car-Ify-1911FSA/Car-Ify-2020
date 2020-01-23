import axios from 'axios';

//ACTION TYPES
const GET_RECENT_HISTORY = 'GET_RECENT_HISTORY';

//ACTION CREATORS
const getRecentHistory = recentHistory => {
  return {
    type: GET_RECENT_HISTORY,
    recentHistory
  };
};

//THUNKY-THUNK
export const getRecentOrderHistoryThunk = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/cart/${userId}`);
      console.log('got data', data);
      const dateConverter = elem => {
        const year = elem.time.slice(0, 4);
        const monthAndDay = elem.time.slice(5, 10);
        elem.time = monthAndDay + '-' + year;
        return elem;
      };
      const filteredData = data.filter(cart => cart.status !== 'active');
      const convertedData = filteredData.map(dateConverter);
      const cartHistory = convertedData.reverse().slice(0, 3);
      dispatch(getRecentHistory(cartHistory));
    } catch (error) {
      console.error(error);
    }
  };
};

// REDUCER
const recentHistoryReducer = (state = [], action) => {
  console.log('we gucci', state);
  switch (action.type) {
    case GET_RECENT_HISTORY:
      return action.recentHistory;
    default:
      return state;
  }
};

export default recentHistoryReducer;
