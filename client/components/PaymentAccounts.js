import React, {Component} from 'react';
import {getPaymentAccountsThunk} from '../store';
import {connect} from 'react-redux';
import PaymentCard from './PaymentCard';
import CheckoutButton from './cart/CheckoutButton';
import PaymentForm from './PaymentForm';

class PaymentAccounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionSelected: ''
    };
    this.handlePaymentOption = this.handlePaymentOption.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllPaymentAcct();
  }

  handlePaymentOption(id) {
    this.setState({optionSelected: id});
  }

  render() {
    const allAccounts = this.props.paymentAccounts;
    const filterAccounts = allAccounts.filter(
      acct => acct.userId === this.props.userId
    );
    return (
      <div>
        <h2>Time to Pay!</h2>
        {this.props.userId ? (
          <div className="paymentActsDiv">
            <h3 className="headerDiv">Your Payment Accounts</h3>
            {filterAccounts.map((acct, idx) => (
              <PaymentCard
                acct={acct}
                key={idx}
                getPaymentAccountId={this.handlePaymentOption}
                fetchOptions={this.props.fetchAllPaymentAcct}
              />
            ))}
          </div>
        ) : null}

        <PaymentForm />

        <div className="paymentActBtnDiv">
          <CheckoutButton paymentAccountId={this.state.optionSelected} />
          <button
            type="button"
            onClick={() => this.props.history.goBack()}
            className="paymentActBackBtn backBtn linkText"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.id,
    paymentAccounts: state.paymentAccounts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllPaymentAcct: () => dispatch(getPaymentAccountsThunk())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentAccounts);
