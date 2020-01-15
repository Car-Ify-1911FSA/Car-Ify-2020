import axios from 'axios'

const GOT_ALL_PAYMENTS = 'GOT_ALL_PAYMENTS'

const gotAllPayments = payments => {
  return {
    type: GOT_ALL_PAYMENTS,
    payments
  }
}

export const getAllPaymentsThunk = () => async dispatch => {
  const {data} = await axios.get('/api/countries')
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
