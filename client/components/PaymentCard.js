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
      <div className="paymentCardFullDiv">
        {this.props.acct.payment ? (
          <div className="paymentCardInsideDiv">
            <input
              type="radio"
              name="button"
              id={this.props.acct.payment.type}
              onClick={this.handleClick}
              className="paymentCardCheckbox"
            ></input>
            <label className="paymentCardLabel">
              <span className="paymentCardSpan">Type: </span>{' '}
              {this.props.acct.payment.type}
            </label>
            <label className="paymentCardLabel">
              <span className="paymentCardSpan">Account: </span>{' '}
              {this.props.acct.name}
            </label>
          </div>
        ) : null}
      </div>
    );
  }
}

export default PaymentCard;
