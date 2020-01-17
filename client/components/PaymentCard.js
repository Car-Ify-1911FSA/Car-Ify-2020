import React from 'react';

const PaymentCard = props => {
  return (
    <div className="paymentCardFullDiv">
      <h4>Type: {props.acct.payment.type}</h4>
      <h4>Account: {props.acct.name}</h4>
    </div>
  );
};

export default PaymentCard;
