import axios from 'axios'

const GET_PAYMENT_ACCOUNTS = 'GET_PAYMENT_ACCOUNTS'

const gotPaymentAccounts = paymentAccounts => {
  return {
    type: GET_PAYMENT_ACCOUNTS,
    paymentAccounts
  }
}

export const getPaymentAccountsThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/payment-accounts')
      dispatch(gotPaymentAccounts(data))
    } catch (error) {
      console.error(error)
    }
  }
}

const paymentAccountsReducer = (paymentAccountsState = [], action) => {
  switch (action.type) {
    case GET_PAYMENT_ACCOUNTS:
      return action.paymentAccounts
    default:
      return paymentAccountsState
  }
}

export default paymentAccountsReducer