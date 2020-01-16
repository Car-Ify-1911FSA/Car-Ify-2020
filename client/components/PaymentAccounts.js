import React, {Component} from 'react';
import {getPaymentAccountsThunk} from '../store';
import {connect} from 'react-redux';
import PaymentCard from './PaymentCard';

class PaymentAccounts extends Component {
  componentDidMount() {
    console.log('payment mount -', this.props);
    this.props.fetchAllPaymentAcct();
  }

  render() {
    const allAccounts = this.props.paymentAccounts;
    const filterAccounts = allAccounts.filter(
      acct => acct.userId === this.props.userId
    );

    console.log('payment render -', allAccounts, filterAccounts);

    return (
      <div>
        <div className="paymentActsDiv">
          <h3>All Payment Accounts</h3>
          {filterAccounts.map((acct, idx) => (
            <PaymentCard acct={acct} key={idx} />
          ))}
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    paymentAccounts: state.paymentAccounts
  };
};

const mapDispatch = dispatch => {
  return {
    fetchAllPaymentAcct: () => dispatch(getPaymentAccountsThunk())
  };
};

export default connect(mapState, mapDispatch)(PaymentAccounts);
