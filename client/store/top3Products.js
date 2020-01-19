import axios from 'axios';

//action types
const GET_TOP_3_PRODUCTS = 'GET_TOP_3_PRODUCTS';

//action creators
const gotTop3Products = top3 => {
  return {
    type: GET_TOP_3_PRODUCTS,
    top3
  };
};

export const loadTop3 = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products');
      console.log('RATEADEDEDE', data);
      const rated = data
        .sort(
          (a, b) =>
            b.totalRating / b.numberRating - a.totalRating / a.numberRating
        )
        .slice(0, 3);
      dispatch(gotTop3Products(rated));
    } catch (error) {
      console.error(error);
    }
  };
};

// Reducer
const top3ProductsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_TOP_3_PRODUCTS:
      return action.top3;
    default:
      return state;
  }
};

export default top3ProductsReducer;
