import React from 'react'

const PaymentCard = props => {
  return (
    <div className="paymentCardFullDiv">
      <span>Type: </span>
      <h4>{props.acct.type}</h4>
      <span>Name: </span>
      <h4>{props.acct.name}</h4>
    </div>
  )
}

export default PaymentCard
