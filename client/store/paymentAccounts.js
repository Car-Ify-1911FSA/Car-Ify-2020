import axios from 'axios'

const GOT_PAYMENT_ACCOUNTS = 'GOT_ALL_PAYMENTS'

const gotPaymentAccounts = paymentAccounts => {
  return {
    type: GOT_ALL_PAYMENTACCOUNTS,
    paymentAccounts
  }
}

export const getAllPaymentsThunk = () => async dispatch => {
  const {data} = await axios.get('/api/allPayments')
  dispatch(gotAllPayments(data))
}

const allPaymentsReducer = (allPaymentsState = [], action) => {
  switch (action.type) {
    case GOT_ALL_PAYMENTS:
      return action.payments
    default:
      return allPaymentsState
  }
}

export default allPaymentsReducer
