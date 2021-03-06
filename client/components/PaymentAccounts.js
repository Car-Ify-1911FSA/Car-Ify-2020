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
      optionSelected: '',
      paymentTypeId: 1,
      payment: 'credit card',
      inputField: ''
    };
    this.handlePaymentOption = this.handlePaymentOption.bind(this);
    this.updateSetter = this.updateSetter.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllPaymentAcct();
    const element = document.querySelector('.sideBarDiv');
    if (element) element.style.opacity = 0;
  }

  componentWillUnmount() {
    const element = document.querySelector('.sideBarDiv');
    if (element) element.style.opacity = 1;
  }

  handlePaymentOption(id) {
    this.setState({...this.state, optionSelected: id});
  }

  updateSetter(type, accountName, typeId) {
    if (!type) {
      this.setState({
        ...this.state,
        inputField: accountName
      });
    } else {
      this.setState({...this.state, payment: type, paymentTypeId: typeId});
    }
  }

  render() {
    const allAccounts = this.props.paymentAccounts;
    const filterAccounts = allAccounts.filter(
      acct => acct.userId === this.props.userId
    );

    return (
      <div className="checkoutFullDiv">
        <h2 className="payments-title">Payments</h2>
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

        <PaymentForm updateSetter={this.updateSetter} />

        <div className="paymentActBtnDiv">
          {!this.props.userId ? (
            <button
              type="button"
              onClick={() => this.props.history.push('/signIn')}
              className="paymentActBackBtn backBtn linkText"
            >
              Login / Sign-Up
            </button>
          ) : (
            ''
          )}

          <button
            type="button"
            onClick={() => this.props.history.goBack()}
            className="paymentActBackBtn backBtn linkText"
          >
            Go Back
          </button>

          <CheckoutButton paymentState={this.state} />
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
