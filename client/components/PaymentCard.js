import React from 'react';

class PaymentCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchOptions();
  }

  handleClick() {
    this.props.getPaymentAccountId(this.props.acct.id);
  }

  render() {
    return (
      <div>
        {this.props.acct.payment ? (
          <div>
            <input type="checkbox"></input>
            <button type="button" onClick={this.handleClick}>
              <h4>Type: {this.props.acct.payment.type}</h4>
              <h4>Account: {this.props.acct.name}</h4>
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default PaymentCard;
