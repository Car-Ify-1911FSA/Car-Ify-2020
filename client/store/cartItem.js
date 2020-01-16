import axios from 'axios';

//Action types
const GET_ITEM = 'GET_ITEM';

//Action creator
const gotItem = cartItem => {
  return {
    type: GET_ITEM,
    cartItem
  };
};

//Thunk creator
export const loadItem = userId => {
  return async dispatch => {
    try {
      //need to check route naming
      const {data} = await axios.get(`/api/orders/${userId}`);
      dispatch(gotItem(data));
    } catch (error) {
      console.error(error);
    }
  };
};

//Reducer
const itemReducer = (itemState = {}, action) => {
  switch (action.type) {
    case GET_ITEM:
      return action.cartItem;
    default:
      return itemState;
  }
};

export default itemReducer;
