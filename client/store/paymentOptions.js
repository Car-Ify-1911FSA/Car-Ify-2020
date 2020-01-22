import axios from 'axios';

const defaultState = [];

const GET_PAYMENT_OPTIONS = 'GET_PAYMENT_OPTIONS';

const gotPaymentOptions = options => {
  return {
    type: GET_PAYMENT_OPTIONS,
    options
  };
};

export const getPaymentOptions = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/payments');
      dispatch(gotPaymentOptions(data));
    } catch (error) {
      console.error(error);
    }
  };
};

const paymentOptionsReducer = (paymentOptions = defaultState, action) => {
  switch (action.type) {
    case GET_PAYMENT_OPTIONS:
      return action.options;
    default:
      return paymentOptions;
  }
};

export default paymentOptionsReducer;
