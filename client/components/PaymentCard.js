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
            <input
              type="radio"
              name="button"
              id={this.props.acct.payment.type}
              onClick={this.handleClick}
            ></input>
            <label>{`Type: ${this.props.acct.payment.type} || Account: ${this.props.acct.name}`}</label>
          </div>
        ) : null}
      </div>
    );
  }
}

export default PaymentCard;
