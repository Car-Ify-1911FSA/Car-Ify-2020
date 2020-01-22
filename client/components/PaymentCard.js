import React from 'react';

class PaymentCard extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   optionSelected: ''
    // };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.getPaymentAccountId(this.props.acct.id);
  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.handleClick}>
          <h4>Type: {this.props.acct.payment.type}</h4>
          <h4>Account: {this.props.acct.name}</h4>
        </button>
      </div>
    );
  }
}

export default PaymentCard;
