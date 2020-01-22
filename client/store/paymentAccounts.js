import axios from 'axios';

// ACTION TYPES
const GET_PAYMENT_ACCOUNTS = 'GET_PAYMENT_ACCOUNTS';
const ADDED_PAYMENT_ACCOUNT = 'ADDED_PAYMENT_ACCOUNT';

// ACTION CREATORS
const gotPaymentAccounts = paymentAccounts => {
  return {
    type: GET_PAYMENT_ACCOUNTS,
    paymentAccounts
  };
};

const addedPaymentAccount = paymentAccount => {
  return {
    type: ADDED_PAYMENT_ACCOUNT,
    paymentAccount
  };
};

// THUNKY THUNKS
export const getPaymentAccountsThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/payment-accounts');
      dispatch(gotPaymentAccounts(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const addPaymentAcountThunk = paymentAccount => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`api/payment-accounts`, paymentAccount);
      dispatch(addedPaymentAccount(data));
    } catch (error) {
      console.error(error);
    }
  };
};

// REDUCER
const paymentAccountsReducer = (paymentAccountsState = [], action) => {
  switch (action.type) {
    case GET_PAYMENT_ACCOUNTS:
      return action.paymentAccounts;
    case ADDED_PAYMENT_ACCOUNT:
      return [...paymentAccountsState, action.paymentAccount];
    default:
      return paymentAccountsState;
  }
};

export default paymentAccountsReducer;
