import React, {Component} from 'react';
import {getPaymentAccountsThunk} from '../store';
import {connect} from 'react-redux';
import PaymentCard from './PaymentCard';
import CheckoutButton from './cart/CheckoutButton';
import PaymentForm from './PaymentForm';
import PaymentAccountForm from './PaymentAccountForm';

class PaymentAccounts extends Component {
  componentDidMount() {
    this.props.fetchAllPaymentAcct();
  }

  render() {
    const allAccounts = this.props.paymentAccounts;
    const filterAccounts = allAccounts.filter(
      acct => acct.userId === this.props.userId
    );

    return (
      <div className="paymentActsFullDiv">
        <h2>Time to Pay!</h2>
        {!filterAccounts.length ? (
          <div className="paymentActsDiv">
            <PaymentForm />
          </div>
        ) : (
          <div className="paymentActsDiv">
            <h3 className="headerDiv">All Payment Accounts</h3>
            {filterAccounts.map((acct, idx) => (
              <PaymentCard acct={acct} key={idx} />
            ))}
          </div>
        )}

        <PaymentAccountForm />

        <div className="paymentActBtnDiv">
          <CheckoutButton />
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
